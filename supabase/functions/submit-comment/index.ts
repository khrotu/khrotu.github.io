import { createClient } from "npm:@supabase/supabase-js@2";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const MODEL_URL = Deno.env.get("SPAM_MODEL_URL") ?? "";
const SPAM_THRESHOLD = Number(Deno.env.get("SPAM_THRESHOLD") ?? "0.90");
const SPAM_MIN_LEN = Number(Deno.env.get("SPAM_MIN_LEN") ?? "70");
const NAME_MAX = 60;
const MSG_MAX = 2000;
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
interface SpamModel {
  tokens: string[];
  idf: number[];
  coef: number[];
  intercept: number;
}
let modelPromise: Promise<SpamModel | null> | null = null;
async function loadModel(): Promise<SpamModel | null> {
  if (!modelPromise) {
    modelPromise = (async () => {
      if (!MODEL_URL) return null;
      const res = await fetch(MODEL_URL);
      if (!res.ok) throw new Error(`model fetch failed: ${res.status}`);
      return (await res.json()) as SpamModel;
    })().catch((err) => {
      console.error("spam model load failed, failing open:", err);
      return null;
    });
  }
  return modelPromise;
}
function tokenize(text: string): string[] {
  const lower = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  const words = lower.match(/[\p{L}\p{N}_]{2,}/gu) ?? [];
  const grams = [...words];
  for (let i = 0; i + 1 < words.length; i++) grams.push(words[i] + " " + words[i + 1]);
  return grams;
}
function spamProbability(text: string, model: SpamModel): number {
  const index = new Map<string, number>();
  for (let i = 0; i < model.tokens.length; i++) index.set(model.tokens[i], i);
  const counts = new Map<number, number>();
  for (const g of tokenize(text)) {
    const i = index.get(g);
    if (i !== undefined) counts.set(i, (counts.get(i) ?? 0) + 1);
  }
  if (counts.size === 0) return 1 / (1 + Math.exp(-model.intercept));
  const vals = new Map<number, number>();
  let normSq = 0;
  for (const [i, c] of counts) {
    const v = (1 + Math.log(c)) * model.idf[i];
    vals.set(i, v);
    normSq += v * v;
  }
  const norm = Math.sqrt(normSq);
  let score = model.intercept;
  for (const [i, v] of vals) score += (v / norm) * model.coef[i];
  return 1 / (1 + Math.exp(-score));
}
function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: CORS });
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  let payload: {
    name?: unknown;
    message?: unknown;
    parent_id?: unknown;
    honeypot?: unknown;
  };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }
  if (typeof payload.honeypot === "string" && payload.honeypot.length > 0) {
    return json({ ok: true, id: null, hidden: false });
  }
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const parentId =
    typeof payload.parent_id === "string" && payload.parent_id.length > 0
      ? payload.parent_id
      : null;
  if (name.length < 1 || name.length > NAME_MAX) {
    return json({ error: "name must be 1-60 characters" }, 400);
  }
  if (message.length < 1 || message.length > MSG_MAX) {
    return json({ error: "message must be 1-2000 characters" }, 400);
  }
  if (parentId !== null && !/^[0-9a-f-]{36}$/i.test(parentId)) {
    return json({ error: "invalid parent_id" }, 400);
  }
  let spamProb: number | null = null;
  let isHidden = false;
  const model = await loadModel();
  if (model && message.length >= SPAM_MIN_LEN) {
    spamProb = spamProbability(message, model);
    isHidden = spamProb >= SPAM_THRESHOLD;
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const { data, error } = await supabase
    .from("guestbook")
    .insert({
      name,
      message,
      parent_id: parentId,
      is_hidden: isHidden,
      spam_probability: spamProb,
    })
    .select("id")
    .single();
  if (error || !data) {
    console.error("insert failed:", error);
    return json({ error: "could not save comment" }, 500);
  }
  return json({ ok: true, id: data.id, hidden: isHidden });
});
