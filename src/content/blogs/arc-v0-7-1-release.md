---
title: 'Arc: v0.7.1 Release'
date: '2026-09-04'
slug: arc-v0-7-1-release
---

Arc version 0.7.1, first released on September 4, 2026.

## Highlights

### OpenCode Session Header Support

OpenCode Go/Zen requires a custom session tracking header starting September 6. This release sends the required header, so existing OpenCode configurations continue to work without interruption.

### Responses API Support

Arc now supports OpenAI's Responses API. Previous versions relied on provider-side conversion from Responses-only models to Chat Completions. Native support covers streaming content, reasoning, tools, images, cached-token usage, and format fallback.

### Cost-Aware Compaction

Compaction now selects its boundary from cost instead of token count alone. The selection accounts for cache hit and miss pricing, output pricing, session token usage, summary size, and context-loss penalties.

## Changelog

### Chat

- None.

### Sidebar Chat

- None.

### Fullscreen Chat

- None.

### Settings

- Added provider pricing and model metadata to routing and settings.

### Backend

- Added OpenAI Responses API support with streaming content, reasoning, tools, images, cached-token usage, and format fallback.
- Improved Anthropic tool-result handling and provider model metadata.
- Added forced OpenRouter catalog refreshes.
- Compaction now selects its boundary from cache pricing, token estimates, summary size, and context-loss penalties instead of token count alone.
- Compressed snapshots retain backward-compatible decoding, with increased limits for large histories.
- Windows sandbox shells now remain on native Win32 terminals instead of routing through a compatibility shell.
- Provider metadata, attribution headers, and model catalog entries are now refreshed.
- Updated OpenAI-compatible usage handling and transport metadata.
- Added coverage for Responses API streaming, cost-aware compaction, catalog refresh, routing, agent reversion, edit validation, shell timeouts, attribution, and security hardening.
