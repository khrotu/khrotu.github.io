---
title: 'Arc: v0.7.5 Release'
date: '2026-10-09'
slug: arc-v0-7-5-release
---

Arc version 0.7.5, first released on October 9, 2026.

## Highlights

### A More Focused Toolset

Arc had several narrow or overlapping tools, while semantic search required a separate embedding and indexing system. This release reduces that overhead and makes tools easier to enable only when they are needed.

Basic, Balanced, and Full presets are now provided as preconfigured options, but you can still customize your toolset. The new `tool.search` tool finds tools on demand. Dedicated git tools now give way to shell commands; custom-run, rule, and test-run tools were removed, and wait, memory, browser-tab, LSP, skill, and todo tools were reduced. Symbol Context replaces `file.semanticSearch`, along with its embedding backends and index watcher.

### A More Flexible Message Queue

Queued messages can now be edited, returned to the composer with their attachments, or sent immediately by stopping the current turn. You can still leave a message queued to send when the turn finishes.

### Clearer Diff Review

Diffs are now reviewed one file at a time, and resolved state is saved with the chat. Fixes to diff boundaries and created-file reverts make review and rollback more reliable.

## Changelog

### Chat

- Queued messages can be edited, deleted, or returned to the composer with their attachments. You can choose to send one after the current turn or stop the turn and send it immediately.
- Diff review is now scoped to one file, and resolved state is saved per chat. Fixed hunk counts, trailing lines, and reverts for files created by the agent.
- Notifications are clickable and return focus to the sidebar.
- Auto mode has updated routing data and difficulty scoring.

### Sidebar Chat

- None.

### Fullscreen Chat

- None.

### Settings

- Replaced the curated tool list with named Basic, Balanced, and Full presets. The Advanced preset was removed, and the remaining presets were reduced.
- Added `tool.search` to find and enable tools when needed.
- Removed the separate semantic-search settings along with the semantic-search feature.

### Backend

- Added `shell.kill` and safer input handling for background processes.
- Improved `syms.context` matching and limits. It now matches whole tokens, stays within defined bounds, and explains its results.
- Removed the standalone git tools in favor of shell commands.
- Removed custom-run, wait, rule, and test-run tools. Reduced the options for wait, memory, browser tabs, LSP, skills, and todos.
- Changed tool-name encoding to drop dots.
- Stopped sending OpenCode user-agent and session headers by default. They are now sent only when the debugging override is enabled, and OpenCode IDs use unbiased random suffixes.
- Router assets now load in parallel, warm before use, and support proxy settings. Terminal choices are deduplicated by descriptor ID.
