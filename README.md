# index1-plugins

Claude Code plugin marketplace for [index1](https://github.com/gladego/index1) — AI-native project knowledge base.

## Install

```
/plugin marketplace add gladego/index1-plugins
/plugin install index1@index1-marketplace
```

## What you get

| Component | What it does |
|-----------|-------------|
| **MCP Server** | Auto-configures `index1 serve` (5 search tools) |
| **Search Rules** | AI knows when to use `docs_search` vs Grep (saves 97% context) |
| `/reindex` | Rebuild project index |
| `/isearch` | Semantic search with follow-up |
| `/doctor` | Environment diagnostics |

## Prerequisites

```bash
pipx install index1           # Install index1
index1 index ./src ./docs     # Index your project
```

Optional for semantic search:

```bash
ollama pull nomic-embed-text  # Or bge-m3 for CJK
```

## License

Apache-2.0
