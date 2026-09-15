---
title: 'Arc: v0.6.0 Release'
date: '2026-08-05'
slug: arc-v0-6-0-release
---

Arc version 0.6.0, first released on August 5, 2026.

## Highlights

### Auto Mode (Beta)

Auto mode routes each prompt to the lowest-cost configured model that meets the estimated difficulty. It uses an in-house fine-tuned difficulty model. Internal testing measured routing decisions under 10 ms at 0.757 AUC[^2][^1]. It supports any configured models instead of a fixed model list. [Learn more](/blogs/arc-auto-mode-beta).

### Prompt Polishing

When enabled, prompt polishing edits the prompt before it is sent to the model. It corrects grammar and spelling only, or rewrites the full prompt, depending on configuration. The polished prompt appears in the composer for approval before sending.

### Chat History Encryption

Chat history is now stored in the encrypted, compact ARCX binary format by default. Existing JSON history migrates to ARCX on first save, and the old JSON file is removed after migration.

## Changelog

### Chat

- Auto mode is available from the model picker. During beta, the router shows its routing decision with accept and reject controls before sending. Sending requires confirmation.
- Added prompt polishing. Polished prompts appear in the composer for approval before sending.
- Subagent turns now show the model used.
- The stop button remains visible while a task runs.
- The queue and steer send control is now a single accent-colored split button, matching the main send button.

### Sidebar Chat

- Added a collapsible plan bar above the composer. It replaces the previous to-do list UI.

### Fullscreen Chat

- None.

### Settings

- Added prompt polish settings with `off`, `basic`, and `polish` modes.
- Added Auto quality bias to route toward lower-cost or higher-capability models.
- Added notification sound settings.

### Backend

- Pressing stop now ends the current task. The busy state clears reliably, and sending is available again even if the agent stopped mid-turn.
- Tasks with repeated provider errors now end with an error instead of retrying without limit.
- History compaction no longer splits tool-call chains across the compaction boundary.
- Larger sessions retain older tool steps in the transcript after a restart.
- Post-edit LSP diagnostics and verification results are now included in the edit tool result instead of separate responses.
- Reverting a checkpoint now removes later snapshots, including snapshots created moments apart.
- File tools reject missing arguments with an error instead of writing or searching for the literal text `undefined`.
- Edits with loose matching on files with Windows line endings no longer corrupt nearby lines.
- Added per-session usage caps for `web.search`, `subagent.spawn`, and `mcp.call`.
- Writes to configuration files (`.arc/`, `.vscode/`, `.cursor/`, `.claude/`, `AGENTS.md`, `CLAUDE.md`, `.arcrules*`) now require approval, even with auto-approve enabled.
- The agent now pauses and requests input after repeated failing or identical tool calls instead of continuing.
- Messages marked `noCompact`, such as plan instructions, are retained through history compaction.
- Chat history migrates to the encrypted ARCX format automatically, and removes the old JSON file after the first save.
- Added the `pre.compact` hook event with a `block` decision, and the `instructions.loaded` hook event.
- Workspace conventions are now read from `.cursorrules`, `.windsurfrules`, `.clinerules`, and `copilot-instructions.md` in addition to existing sources.
- Added `${env:VAR}` interpolation in MCP server configurations.

[^1]: Performance

Measured on an Intel® Core™ Ultra 9 Processor 185H, using a 5,000-prompt pool (p50 500-char / p90 1,300-char). Includes estimated data for an Intel® Core™ i5-12400F.

| Metric | Ultra 9 185H | i5-12400F |
| --- | --- | --- |
| mean | 1.96 ms | 2.33 ms |
| p50 | 1.57 ms | 1.87 ms |
| p90 | 3.33 ms | 3.96 ms |
| p99 | 7.07 ms | 8.41 ms |
| throughput | ~510 prompts/s | ~429 prompts/s |

[^2]: Accuracy

We evaluated Auto mode on 1,190 prompts, selected with seed 42 from the canonical pool of 5,947 labeled prompts.

| Category | Source | AUC | n |
| --- | --- | --- | --- |
| **Agentic** | swechat | **0.711** | 757 |
| | gdpval | 0.604 | 37 |
| | tbench | n/a¹ | 19 |
| | agenttrace | n/a¹ | 2 |
| **Knowledge QA** | hle | 0.443 | 88 |
| | gpqa | 0.603 | 140 |
| | scicode | 0.205 | 19 |
| | critpt | n/a¹ | 8 |
| **Environment-graded** | τ²-bench (trajectories) | **0.993** | 120 |
| **Overall** | all sources | **0.757** | 1,190 |
| *Category aggregates* | agentic (swechat+gdpval+tbench+agenttrace) | 0.714 | 815 |
| | knowledge (hle+gpqa+critpt+scicode) | 0.604 | 255 |
| | env-graded (τ²) | 0.993 | 120 |

¹ The tbench, agenttrace, and critpt results are not reported because those groups are too small or contain only one outcome type, while across all 1,190 evaluated prompts Auto mode achieved a balanced accuracy of 0.611 and a Brier score of 0.187.
