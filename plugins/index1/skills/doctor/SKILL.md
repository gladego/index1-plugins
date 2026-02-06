---
description: Diagnose index1 environment and health status
---

Run the following commands sequentially and report results:

1. `index1 doctor` - Environment diagnostics
2. `index1 status` - Index statistics
3. `ollama list` - Installed models

If issues are found, provide specific fix recommendations:
- Missing Python: install Python 3.11+
- Missing Ollama: `curl -fsSL https://ollama.com/install.sh | sh`
- Missing model: `ollama pull nomic-embed-text`
- No index: `index1 index ./src ./docs`
- No CJK support: `pip install index1[chinese]`
