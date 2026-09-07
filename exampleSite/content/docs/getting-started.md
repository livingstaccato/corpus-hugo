---
title: Getting Started
summary: Install the theme and serve the example site.
weight: 1
tags: [setup]
created: "2026-01-01"
sources:
  - README.md
related:
  - theming
  - team
---

Add the theme to a Hugo site's `themesDir`, then set `theme = "corpus-hugo"`
in `hugo.toml`.

```sh
git submodule add https://github.com/livingstaccato/corpus-hugo themes/corpus-hugo
```

Run it locally:

```sh
hugo server
```
