#!/usr/bin/env bash
# Build both exampleSite corpora and serve them merged under one origin, so
# the hub switcher, footer context pills, x-kb: links, and cross-corpus
# search all have something real to work against. `hugo server` can't merge
# two separately-configured sites, so this does a static build of each and
# serves the result with a plain file server.
set -euo pipefail

THEME_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HUB="$THEME_ROOT/hub"
PORT="${1:-8788}"

rm -rf "$HUB"
echo "Building exampleSite (hub root)…"
hugo --source "$THEME_ROOT/exampleSite" --themesDir ../.. --destination "$HUB" --minify --quiet
echo "Building exampleSite-hub-b (/guides-hub/)…"
hugo --source "$THEME_ROOT/exampleSite-hub-b" --themesDir ../.. --destination "$HUB/guides-hub" --minify --quiet

echo
echo "Hub assembled at $HUB"
echo "Serving → http://localhost:$PORT/   (Ctrl+C to stop)"
cd "$HUB"
exec python3 -m http.server "$PORT"
