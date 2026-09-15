---
title: 'Arc: v0.7.0 Release'
date: '2026-09-02'
slug: arc-v0-7-0-release
---

Arc version 0.7.0, first released on September 2, 2026.

## Highlights

### Agent Data Import

Arc now imports chat histories and API keys from Cline, Kilo Code, OpenCode, ZCode, and Continue. Tool calls, reasoning, and responses are converted to Arc's native format. Support for additional sources and data types (memory, MCP, and others) is planned. Chat history loading is now batched, so long histories load in a single state update.

### Prompt-Injection Protection

Arc now includes a built-in prompt-injection scanner. It detects role-tag forgeries, instruction overrides, sleeper triggers, and Base64-encoded evasion attempts. Untrusted remote outputs from web, browser, and MCP tools are datamarked and quarantined on deny. Write-time gates prevent persistent notes, skills, and workspace rules from being modified by injected content.

### Windows Sandboxing

Windows shell execution now runs under restricted tokens with dropped privileges, Low mandatory integrity, and Job Object lifecycle limits. The confinement matches the macOS seatbelt and Linux bwrap profiles.

### Shell Selection and Integrated Terminal

The shell used for execution can now be selected on Windows, macOS, and Linux (PowerShell, Git Bash, WSL distros, zsh, fish, Nushell, and others). Commands run either through the Arc background runner with sandboxing, or inside an integrated VS Code terminal.

## Changelog

### Chat

- Added an auto-approve selector in the top bar with `Always ask`, `Safelist`, `Allowlist`, and `Hail mary` options.
- Large conversations now use windowed transcript rendering. The newest 400 messages render, with scroll-to-top expansion and a "Load earlier messages" button.
- Reverting to a message now restores its text into the composer, including consecutive reverts of identical text.
- Foreground shell commands that time out are now adopted into the background registry instead of terminated. Output can then be inspected, input can be sent, or completion can be awaited.
- Browser steps (`browser.runCode` and `browser.evaluate`) now display captured code labeled "Code".
- The working indicator now remains visible during reasoning and tool-preparation steps while text streams.
- Added three attention sound styles: pitched beeps, bubble pops, and system default notification sounds.
- Attach submenus now open toward the viewport side with available space.
- Model selections and auto-approve state changes now broadcast immediately across all open webview panels.

### Sidebar Chat

- None.

### Fullscreen Chat

- None.

### Settings

- Settings are now organized into five tabs: Models, Providers, Agent, Tools, and Workspace, with collapsible nested sections.
- Added a dedicated About tab with version information, update log links, and the Agent Data Import panel.
- Added one-click migration from Cline, Kilo Code, OpenCode, ZCode, and Continue, with selective credential and chat history import.
- Added shell terminal selection with automatic detection of installed shells across Windows (pwsh, PowerShell 5.1, Git Bash, WSL, cmd, Nushell), macOS, and Linux.
- Added a shell execution surface setting to select Arc-handled background execution or execution in an integrated VS Code terminal.
- Added support for multiple API keys per provider, with key preview masking, addition, replacement, deletion, and automatic rotation.
- Added a prompt-injection protection level setting (`off`, `balanced`, `strict`) under Tools > Security.
- Added an OpenRouter embeddings provider option alongside Ollama for semantic search, with automatic model discovery.
- Added dynamic model catalog search with provider-specific context, pricing, and output parameter overrides.
- Added curated default tool presets with a one-click reset to defaults.
- Added a system sandbox profile option alongside the workspace and read-only profiles.

### Backend

- The agent importer now streams and normalizes chats and tool calls from Cline, Kilo Code, OpenCode, ZCode, and Continue. History caps are raised to 100k messages and 512 MB.
- The prompt-injection protection scanner now detects token forgery, role hijacking, evasion encoding, and exfiltration attempts. Remote tool outputs are datamarked, and denied payloads are quarantined.
- Write-time security gates now block memory poisoning in persistent notes, skill bodies, and workspace instructions.
- Added Windows sandbox support through restricted low-integrity tokens and Job Objects. Write confinement matches macOS seatbelt and Linux bwrap.
- Added a system sandbox profile across Windows, macOS, and Linux. It allows home directory writes while protecting core OS files.
- Added native git tools (`git.stage`, `git.commit`, `git.push`, `git.branch`, `git.pr`) with ref validation and force-with-lease safety.
- Added workspace hook management tools (`hooks.list`, `hooks.create`, `hooks.update`, `hooks.delete`) with interactive prompt generation.
- The integrated VS Code terminal runner now executes shell commands in a dedicated "Arc" terminal with serialized queues and shell-integration output capture.
- The provider failover loop now rotates through multiple API keys per provider across retries and failovers.
- Added one-click internal provider setup for free GLM 5.3 Flash and Qwen3.8 Flash models with direct process lifecycle management.
- Replaced static Artificial Analysis leaderboard data with live OpenRouter metadata and seven-day cached scoring.
- Added MCP SSE transport with live traffic capture and full OAuth authentication with loopback callback handling.
- Batched chat loading through `session/replaceState` now replaces per-message IPC. Large imports load in a single state update.
- Git resolution is now hardened with null-caching and descriptive error messages.
