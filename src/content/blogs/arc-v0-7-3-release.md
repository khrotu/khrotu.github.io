---
title: 'Arc: v0.7.3 Release'
date: '2026-09-23'
slug: arc-v0-7-3-release
---

Arc version 0.7.3, first released on September 23, 2026.

## Highlights

### VS Code and GitHub Copilot Models

Arc can now use models provided by VS Code and GitHub Copilot. VS Code model access is consent-based, and Copilot credentials are exchanged for request tokens and cached for reuse.

### OpenCode and Provider Discovery

OpenCode support now sends the client headers it expects and checks for the latest version. Arc also finds provider models more reliably, handles the updated OpenRouter model list, and merges duplicate provider entries and their keys.

### MCP Sign-In Fixes

HTTP and SSE MCP servers can now start OAuth sign-in when a server requests it, even if OAuth was not selected during setup. Arc also handles authorization servers hosted on a different domain while keeping HTTPS and network safety checks in place.

## Changelog

### Chat

- Fixed a webview crash caused by clarification prompts. Error overlays now render outside the chat's managed content, and clarification fields are converted to strings before display.
- Removed the 40-round turn limit, so long tasks are no longer stopped with a forced turn-budget error.
- Refined chat layout, settings presentation, and Markdown and math rendering. Math symbols and environments now render more consistently.

### Sidebar Chat

- None.

### Fullscreen Chat

- None.

### Settings

- Added VS Code language models as a consent-based provider.
- Added GitHub Copilot as a provider. Arc exchanges GitHub credentials for Copilot request tokens and caches those tokens.
- Updated provider setup and model labels, and removed retired GitHub Models entries.
- Improved MCP setup: the Authenticate button is available for all HTTP and SSE servers, including servers that request OAuth after connection.
- Provider settings now merge equivalent providers and their API keys instead of listing duplicates.

### Backend

- Fixed MCP OAuth discovery for servers that return a Bearer challenge. Arc can now begin sign-in after an unauthenticated request receives a 401, discover resource-metadata issuers, and use the live server URL when no URL is saved.
- OAuth discovery and client registration can use a different HTTPS domain from the MCP server. DNS-pinned SSRF checks remain enabled, and the user approves sign-in in their browser.
- Resource-metadata scopes now take priority when present. After sign-in, Arc upgrades the server to OAuth and preserves saved tokens when configuration changes.
- Fixed pinned DNS lookup to return the complete set of resolved addresses required by Node's connection handling.
- OpenCode requests now include client headers, and Arc caches the latest OpenCode version.
- OpenRouter model discovery now handles the updated frontend response. Provider model lists are cached by provider, duplicate requests are combined, and caches can be refreshed on demand.
- Added browser tooling and expanded provider catalog coverage.
- Added tests for OAuth recovery and transport upgrades, DNS safety, provider attribution and version caching, chat rendering, and browser behavior.
