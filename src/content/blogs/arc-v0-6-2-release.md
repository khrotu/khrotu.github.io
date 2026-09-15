---
title: 'Arc: v0.6.2 Release'
date: '2026-08-28'
slug: arc-v0-6-2-release
---

Arc version 0.6.2, first released on August 28, 2026.

## Highlights

### Per-Domain Auto Routing

Auto mode now classifies each prompt by domain: code, math, deep reasoning, or agentic work. Classification uses a new domain head and completes in under one millisecond. Per-domain capability thresholds replace the previous single threshold.

Model selection now accounts for reliability, latency, provider health, and cost together, and selects the lowest-cost model that clears the threshold. The difficulty model was retrained on the full 6,290-prompt labeled set. AUC increased from 0.757 to 0.782. When confidence is high, Auto mode sends without confirmation. When confidence is low, it requests confirmation. [Learn more](/blogs/arc-auto-mode-update).

### Checkpoint and Context Rewind

Reverting to a message now restores the conversation and files, including points before a compaction boundary. Checkpoint snapshots taken in the same turn now merge instead of overwriting each other. Restores are fault-tolerant per file and report an error list. Rewinding to a pre-compaction point also restores the archived context.

### Tool-Run Summaries

Tool-call chains can now be summarized by configuration. Summaries use either an Arc-generated usage message (for example, "Globbed and searched files") or a short model-written summary.

## Changelog

### Chat

- LaTeX math now renders in chat through a self-contained mini-KaTeX.
- Code blocks now use updated styling within the chat interface.
- Reopening a chat now restores the stored context percentage and cost. Real provider prompt tokens are persisted instead of re-estimated.
- The recorded model for each turn now matches the selected model. Costs no longer show as $0 from incorrect attribution.
- Turns that end with no visible output, including reasoning-only responses, are now retried automatically with a hidden continuation prompt.
- Tool chains can now be summarized as a count, a usage phrase, or a model-written summary, depending on configuration.
- Expand no longer clips content in long tool chains.
- Native notifications now fire only when the VS Code window is unfocused.
- The top-bar cost now renders to one decimal place. Hovering shows the exact amount to three decimal places.

### Sidebar Chat

- Chat search no longer allows stale results to overwrite fresh results.

### Fullscreen Chat

- None.

### Settings

- Added UI and mono font selection, including custom family inputs.
- Added a tool-run summary setting with count, top-tools, and model-written summary options.
- Auto mode quality is now a single preset: balanced, economy, or power.
- Added `arc.router.autoRoute` to skip the routed-model confirmation in Auto mode and send directly.
- The compaction safety margin now applies. The token reserve adapts to the model when no fixed strategy is set.

### Backend

- Auto mode now routes per domain. Selection minimizes a utility function over clearing margin, latency, health, and cost. Routing is limited to models with a real Artificial Analysis score, weighted by live provider health and latency.
- A per-user tau now raises the routing threshold after soft failures from auto-routed turns.
- Retrained the difficulty model on the full 6,290-prompt set (AUC 0.757 to 0.782). Rebuilt calibration and capability data from all labels with three reliable anchors. Removed a broken anchor that had reduced routing quality to 0.49. Router assets are now versioned so caches refresh.
- Requests now send per-provider app-attribution headers, a descriptive user agent, and vendor-prefixed extras.
- Compaction was reworked. Segmentation no longer miscounts system messages. Re-compaction folds prior summaries into the new summary. `noCompact` protection covers whole tool chains. Dropped messages are archived and available to the model through `context.retrieve`.
- The rewritten condensing prompt now records intent verbatim, decisions, code state, errors, task state, and constraints.
- Checkpoint snapshots in the same turn now merge instead of overwriting. Restores include files changed through shell or browser tools.
- Reverting to a message now unions each undone turn oldest-wins per file and searches the archived region. Rewinds restore conversation context and files across compaction. Restores are per-file fault-tolerant with an error list.
- The 4 MiB stream cap now counts assistant text only. Long-reasoning turns no longer abort mid-stream.
- Fixed agent lifecycle leaks. Orphaned agents are stopped before replacement. Approval and clarification timers are cleared. Deactivation now kills processes, terminates provider servers, and disposes listeners.
- Per-token webview broadcasts are now coalesced to about 20 messages per second. Duplicate session posts are removed. Inbound messages now use a size check instead of `JSON.stringify`.
- The MCP marketplace cache is now bounded, and its searches run in parallel, alongside browser-tab restore.
- The chat history codec is now ARCX v2. It decodes v1 archives for backward compatibility.
- Audit-log lock-contention warnings are now suppressed when transient and rate-limited otherwise.
- Migrated to pnpm 11.
