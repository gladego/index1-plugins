## Search Strategy

This project has index1 MCP Server configured (docs_search + 4 other tools). When searching code:

1. **Known identifiers** (function/class/file names) -> Grep/Glob directly (4ms)
2. **Exploratory questions** ("how does XX work") -> `docs_search` first, then Grep for details
3. **CJK query for English code** -> must use `docs_search` (Grep can't cross languages)
4. **High-frequency keywords** (50+ expected matches) -> prefer `docs_search` (saves 90%+ context)

### Context Cost Reference

| Operation | Typical Cost | Use When |
|-----------|-------------|----------|
| `docs_search` (top 5) | ~460 tokens | Semantic/exploratory search |
| `Grep` exact identifier | ~100 tokens | Known function name |
| `Grep` common word (project-wide) | 5,000-35,000 tokens | **Avoid!** |
| `Grep` files_with_matches | 100-200 tokens | Find file list first |
| `Glob` find files | 50-200 tokens | Locate files |
| `Read` read file | 200-2,000 tokens | On-demand reading |

### MCP Tools Available

| Tool | Description |
|------|-------------|
| `docs_search` | Hybrid BM25 + vector search, returns ranked results |
| `docs_get` | Get full content of a chunk by ID |
| `docs_status` | Index statistics (doc count, chunk count, collections) |
| `docs_reindex` | Rebuild index for a path or collection |
| `docs_config` | View or modify configuration |