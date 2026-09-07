---
title: Diagrams & Cross-Links
summary: Image/diagram conventions and the three link forms the render hook handles.
weight: 6
tags: [links]
---

Three link forms get special handling in
`layouts/_default/_markup/render-link.html`:

- `x-kb:<corpus>/<page>` — cross-corpus link, resolved against the hub
  manifest (see [Hub Switcher](/docs/hub-switcher/)).
- A relative `page.md` link — resolved to that page's pretty URL.
- A site-absolute `/path` — passed through `relURL` so it still works when
  the site is mounted under a sub-path `baseURL`.

Diagram images (`.puml`, `.svg`, `.png`) referenced from Markdown are assumed
co-located with their rendered output, under `kb-diagrams/<same-dir>/` —
see `layouts/_default/_markup/render-image.html`.
