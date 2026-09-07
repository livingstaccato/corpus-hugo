#!/usr/bin/env bash
# Serve exampleSite locally against this theme.
set -euo pipefail

THEME_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${1:-1313}"

exec hugo server --source "$THEME_ROOT/exampleSite" --themesDir ../.. --port "$PORT"
