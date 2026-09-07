---
title: Theming
summary: Every color is a CSS custom property.
weight: 2
tags: [css, tokens]
created: "2026-01-01"
related:
  - getting-started
references:
  - "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties MDN: Using CSS custom properties"
---

Override any token in `tokens.css` from your own site's CSS:

| Token | Default | Purpose |
| --- | --- | --- |
| `--accent` | `#4f46e5` | Links, buttons, active nav |
| `--bg` / `--fg` | light/dark pair | Page background / text |
| `--font-head` | system stack | Headings |

```css
:root { --accent: #0f766e; }
```
