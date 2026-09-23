---
title: 'Arc: v0.7.2 Release'
date: '2026-09-13'
slug: arc-v0-7-2-release
---

Arc version 0.7.2, first released on September 13, 2026.

## Highlights

### Symbols Code Intelligence

The new `syms.context` tool finds relevant symbols in a workspace, follows their usage, and helps Arc quickly learn your codebase in new chats without wasting time and tokens on exploration.

### Token-Optimization Suggestions

Arc now watches which tools, MCP servers, skills, rules, and memories you actually use. When something has been idle for long enough, Arc will suggest unloading it and show an estimate of the tokens that would be saved.

### Smarter Context Compression

Context compression now handles searches, diffs, data, logs, and repeated content. It retains relevant information, preserves important changes, and removes redundant content.

## Changelog

### Chat

- Chat history, resume state, and checkpoints are now stored separately for each workspace.
- Chat cost and context totals are restored from saved metadata when a chat opens.
- Tool-chain headers stay visible while scrolling.
- Errors and tool output can now be expanded.
- File diffs show three lines of context and preserve CRLF line endings and line numbers.
- File diffs no longer have accept and reject buttons. Review them from the composer or the Auto mode interface.
- Approval and clarification controls now use the same composer extension in the sidebar and fullscreen chat.
- Arc suggests unused context and shows the estimated token savings from unloading it. You can unload or dismiss a suggestion with one click.
- Chat loading now tracks local messages by ID, blocks sends while a turn is stopping or routing, shortens very long streaming responses, and labels edited messages with `(edited)`.
- Editing or reverting a message now updates context accounting, keeps the original text, and ignores stale session updates.
- Conversation search validates results, ignores older responses, and stops loading when the search is empty.
- Markdown tables and file references parse more reliably. `begin`/`end` math environments now render as grids.
- Browser and MCP state, notifications, and attention settings update across open chat views.

### Sidebar Chat

- None.

### Fullscreen Chat

- None.

### Settings

- Added `arc.notifications.enabled` and an operating-system notification toggle under Sounds & Notifications.
- Added `arc.showProblems` and the `Arc: Scan Diff for Security Issues` command.
- Added token-optimization settings and MCP tool counts to server information.
- Custom font changes are now written after a short delay. Provider-list updates no longer repeat settings work.
- Added model icons for newer OpenRouter models and updated settings text.
- Removed the unused `Arc: Open Playground` command, icon exports, tool defaults, and optional Playwright packaging dependencies.

### Backend

- Added the read-only, parallel-safe `syms.context` tool. It scans up to 500 files, reads up to 512 KB per file, extracts up to 20,000 symbols, ranks them, follows callers and callees, and returns at most 24,000 characters. It does not guess when a match is ambiguous.
- Reworked compression for searches, diffs, JSON, logs, and text. It removes ANSI codes, excess blank lines, repeated lines, repeated blocks, search headings, and diff indexes before reducing the content further.
- Search compression ranks results by relevance, preserves errors and other required lines, handles CJK text, removes duplicates, checks token savings, and uses a bounded cache and verified retrieval blobs.
- Compressed blobs now use full 64-character hashes. Loads validate the identifier and size, stream the content, verify the hash, and report truncation.
- Read-only tool calls can run together. Mutating tools, handoffs, and subagent calls run separately. Batches contain at most five calls, mode permissions are checked before execution, and subagents cannot spawn subagents or ask users directly.
- Handoffs now support all four model tiers. Cost ceilings, escalation limits, and ping-pong protection limit repeated handoffs. Streaming routes check the first event and skip providers whose credentials fail on every available key.
- Invalid model, calibration, domain, and TF-IDF data now stops with an error. OpenRouter variant models remain separate.
- Search indexing and file watching respect `.arcignore`, reject unsafe paths and symlinks, skip binary and oversized files, batch embeddings, track file IDs for removal, and use polling safely on Linux when needed.
- Vector indexes validate dimensions, IDs, metadata, and numeric values. They return defensive copies and save atomically. Hash search now handles Unicode letters and numbers.
- Network requests now check IPv6 private addresses, pin DNS resolution, reject unsafe redirects, and use a safe request fallback. Retries cover transient network errors and limit `Retry-After` to five minutes.
- Prompt-injection scanning checks more Base64 content, uses 24-character nonces, keeps both ends of long text, and escapes wrapper markers. Secret redaction now covers more provider keys, JWTs, and private keys.
- File edits reject oversized and ambiguous matches, preserve line endings and permissions, create new files with mode `0600`, write atomically, and enforce limits on diffs, regular expressions, locks, and paths.
- MCP connections now clean up timers, retry one unauthorized response, validate SSE endpoints and origins, limit OAuth response bodies, require HTTPS for OAuth endpoints, and limit sampling messages.
- Chat history repairs invalid messages and tool calls. Checkpoints use verified atomic objects. Memory and tracker writes are serialized and recoverable after corruption.
- Skills can be pinned and checked by hash. Workspace modes cannot grant tools outside their base mode. Repository rules are merged after trusted registry rules.
- Browser navigation only allows HTTP and HTTPS. Prototype access is blocked, and page evaluation must use the dedicated browser tool.
- Provider capability failures expire after a fixed time. Model caches use the provider and API-key hash. Retries cover transient transport errors, and tool names use an escape-aware encoding.
- MCP sampling has a per-server hourly limit. Chat snapshots use per-message framing, recover from corrupt frames, limit decompression, and remain backward-compatible.
- Session generations discard stale broadcasts. Corrupt ARCX files are quarantined. Requirements locks are downloaded with hash verification. Terminal generations prevent stale integrated terminals from accepting output.
- Added tests for compression, symbol context, parallel tool execution, checkpoint objects, search truncation, security nonces, attribution, routing variants, corrupt chat frames, and the other hardening changes.
