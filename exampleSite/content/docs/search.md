---
title: Search
summary: Wire up search_enabled and a search-index.json.
weight: 4
tags: [feature]
related:
  - hub-switcher
---

Set `search_enabled = true` in `[params]` to render the home search panel.
It loads `assets/js/search.js`, which fetches a `search-index.json` next to
the page — the theme does not generate this file; your site's build does.
Each entry:

```json
{
  "title": "Getting Started",
  "summary": "One line for the result list.",
  "kind": "docs",
  "source_path": "docs/getting-started.md",
  "text": "Full page text, used only for matching.",
  "url": "/docs/getting-started/"
}
```

This exampleSite generates its own via a small Hugo output format —
see `exampleSite/layouts/index.searchindex.json`.
