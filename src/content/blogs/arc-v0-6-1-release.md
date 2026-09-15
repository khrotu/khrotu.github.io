---
title: 'Arc: v0.6.1 Release'
date: '2026-08-12'
slug: arc-v0-6-1-release
---

Arc version 0.6.1, first released on August 12, 2026.

## Highlights

### Settings Reorganization

Settings are now organized into additional, more specific tabs. The new Tools tab disables specific tools by category or by individual tool. Disabled tools are omitted from model tool definitions, which reduces tokens per request.

### Clickable File References

File references in chat now render as clickable chips. Selecting a `path:line` or `path:start-end` reference opens the file and selects the specified range.

### Reversible Context Compression

Oversized tool outputs are now compressed before storage in history. The full output remains available on demand through retrieval. Compressed history reduces context size while preserving access to the original content.

## Changelog

### Chat

- File references now render as clickable chips that link to the source range.
- File-edit diffs now stream live in the chat as they are applied.
- Compaction now shows a standalone "Compacted N messages" summary row.
- Chat-cost inflation with history length is fixed. Costs and context percentage now hydrate correctly on open.

### Sidebar Chat

- The chat list is now more compact.

### Fullscreen Chat

- None.

### Settings

- Settings are now organized into additional tabs.
- Added a Tools tab with category and individual tool checkboxes. Disabled tools are omitted from model tool definitions.
- Added settings UI for reasoning effort, shell approval, and sandbox profile.
- Added `arc.diffView.autoOpen` to auto-open and stream file-edit diffs in the main window.

### Backend

- Oversized tool outputs (JSON, logs, text) are now compressed before history storage and restored on demand through `context.retrieve`.
- Added `memory.note` and automatic per-workspace notes. Notes are written to `NOTES.md` in `~/.arc` and injected into future sessions.
- Added polling-free wait tools (`wait.for`, `wait.until`, `wait.forProcess`, `wait.forCommand`) with abort support.
- Subagents now inherit the parent approval configuration. Steering no longer triggers repeated approval prompts.
- `trackToolMistakes` now triggers only after the identical tool call fails three times consecutively.
- Approval dialogs now show readable summaries for each tool.
- The provider catalog expanded from 150+ to 262+ providers.
