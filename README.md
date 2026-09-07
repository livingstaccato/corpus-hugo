# corpus-hugo

A tokenized, light/dark Hugo theme for a knowledge-base or docs site.
Every theme-critical color is a CSS custom property (`assets/css/tokens.css`),
so a consuming site can rebrand by overriding variables rather than editing
the theme.

## Features

- Light/dark mode, explicit toggle + `prefers-color-scheme`, persisted in
  `localStorage`.
- Optional multi-site **hub switcher**: when a site sets `knowledge_id` and
  points at a `contexts.json` manifest, the header and footer render a
  dropdown/pill list of sibling knowledge bases.
- Optional **cross-site search**: `layouts/index.html` wires up
  `assets/js/search.js` against each site's `search-index.json`, falling back
  to a single-site index when no hub manifest is present.
- Member chips (`assets/js/member-chip.js`): click a name to copy an email.
- Build stamp in the footer, sourced from `HUGO_BUILD_DATE` / `HUGO_GIT_SHA` /
  `HUGO_BUILD_STREAM` env vars, falling back to Hugo's git info.
- Canonical link + Open Graph/Twitter meta on every page, a default favicon
  (override by dropping your own `static/favicon.svg`), and a themed 404 page.
- Contrast-checked against WCAG AA in both light and dark mode, including
  focus indicators (`--link`, not `--accent`, is what text and outlines use
  against a page background — `--accent` alone is only safe as a filled
  background with `--on-accent` text on top).

## Site params

| Param | Purpose |
| --- | --- |
| `tagline` | Hero subhead / home `<h1>` fallback |
| `description` | Hero lede |
| `cta_url`, `cta_label` | Hero call-to-action button |
| `search_enabled` | Renders the home search panel |
| `knowledge_id` | This site's id, used to mark itself "current" in a hub |
| `knowledge_hub_root` | Path to the hub's `contexts.json` (default `/knowledge/`) |
| `knowledge_hub_root_id` | `knowledge_id` of the corpus mounted at the hub root (no subpath), for `x-kb:` cross-links |
| `copyrightHolder` | Footer copyright name (defaults to `site.Title`) |
| `github` | Footer "GitHub" link |
| `watermark` | Path to a background watermark image |
| `social_image` | Open Graph / Twitter card image |

## Try it

```sh
./scripts/preview.sh        # serves exampleSite at :1313
```

## License

MIT — see [LICENSE](LICENSE).
