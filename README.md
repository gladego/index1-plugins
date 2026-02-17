# index1-plugins

Claude Code plugin marketplace for [index1](https://github.com/gladego/index1) — AI memory system for coding agents.

## Install

```bash
pipx install index1
index1 setup                  # One-click plugin install
```

## What you get

| Component | What it does |
|-----------|-------------|
| **MCP Server** | Auto-configures `index1 serve` (6 tools: recall/learn/read/status/reindex/config) |
| **Search Rules** | AI knows when to use `recall` vs Grep (saves 97% context) |
| `/reindex` | Rebuild project index |
| `/isearch` | Semantic search with follow-up |
| `/doctor` | Environment diagnostics |

## Prerequisites

```bash
pipx install index1           # Install index1
index1 index ./src ./docs     # Index your project
```

Vector search works out of the box (built-in ONNX embedding). Optional for multilingual:

```bash
ollama pull nomic-embed-text  # Or bge-m3 for CJK
```

## License

Apache-2.0
