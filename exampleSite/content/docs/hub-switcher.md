---
title: Hub Switcher
summary: Mount several corpora under one origin with a dropdown between them.
weight: 5
tags: [hub]
related:
  - search
---

A single corpus doesn't need any of this — `knowledge_id` and
`knowledge_hub_root` are optional, and this exampleSite doesn't set a
manifest, so the switcher stays invisible.

To join a hub, point every corpus at a shared `contexts.json`:

```json
[
  { "id": "docs",   "title": "Docs",   "path": "/knowledge/" },
  { "id": "guides", "title": "Guides", "path": "/knowledge/guides/" }
]
```

Set `knowledge_hub_root_id` to whichever id is mounted at the hub root
(no subpath) — `x-kb:<id>/<page>` cross-links and cross-corpus search both
resolve against this manifest.
