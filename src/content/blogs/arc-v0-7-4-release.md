---
title: 'Arc: v0.7.4 Release'
date: '2026-09-26'
slug: arc-v0-7-4-release
---

Arc version 0.7.4, first released on September 26, 2026.

## Highlights

### Choose Your Web Search Provider

Arc can now search with Exa, Firecrawl, Parallel, or Tavily. Add a provider key in Tools settings, or keep using Arc's built-in search. If a selected service fails, Arc falls back to built-in search.

### More Control Over Stored Data

Settings now include controls to delete stored data and enable experimental overrides.

### Easier Handling of Long Messages

Large pastes now appear as expandable, editable blocks. Long chat messages can also be collapsed, and attachment details stay available.

## Changelog

### Chat

- Large pastes now collapse into editable blocks that can be expanded when needed.
- Long chat messages can be collapsed, and attachment details are preserved.
- Fixed an issue with notification display on Windows. The agent now shows notifications when it needs input or permission.
- Streaming thought display has been improved.

### Sidebar Chat

- None.

### Fullscreen Chat

- None.

### Settings

- Added Exa, Firecrawl, Parallel, and Tavily as configurable web search backends. Select a backend and enter its API key under Tools.
- Added controls to delete stored data and enable experimental overrides.
- Added settings for controlling OpenCode Zen backend debugging override.

### Backend

- Web search falls back to Arc's built-in search if a configured backend fails.
- Provider selection now favors providers that have succeeded, while preserving failover to other providers.
- Added Windows toast notifications for supported VS Code variants.
- Provider URLs and web search results are validated. Hook patterns, browser selectors, and VSIX paths now receive additional checks.
- Inline sessions and diff previews now use UUIDs. Markdown highlighting handles template literal interpolation.
- Renamed host modules to make their responsibilities clearer.
- Updated license attribution and expanded test coverage.
- Added OpenCode Zen backend debugging override.
