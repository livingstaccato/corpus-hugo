---
title: Welcome
summary: A cross-corpus link, resolved by the render-link hook.
weight: 1
---

This corpus is mounted at `/guides-hub/`; the main site is the hub root.
This link crosses from here back to it:

[Getting Started](x-kb:example/docs/getting-started)

`x-kb:example/docs/getting-started` resolves against `knowledge_hub_root_id`
(`example`, the corpus with no subpath) to produce `/docs/getting-started/` —
see `layouts/_default/_markup/render-link.html`.
