#!/bin/sh
set -e

APP_DIR=/app/dist
CONFIG_FILE="$APP_DIR/config.js"

RAW_DOMAIN="${AUTH0_DOMAIN}" || true
STRIPPED_DOMAIN="${RAW_DOMAIN#https://}"
STRIPPED_DOMAIN="${STRIPPED_DOMAIN#http://}"
STRIPPED_DOMAIN="${STRIPPED_DOMAIN%/}"

cat > "$CONFIG_FILE" <<EOF
// Generated at container start; do not commit secrets.
globalThis.runtimeConfig = {
  AUTH0_DOMAIN: "${STRIPPED_DOMAIN}",
  AUTH0_CLIENT_ID: "${AUTH0_CLIENT_ID}",
  GENERATED_AT: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
};
EOF

echo "Generated runtime config.js:" && cat "$CONFIG_FILE"

[ -z "$STRIPPED_DOMAIN" ] && echo "[WARN] AUTH0_DOMAIN not set; login will fail." || true
[ -z "$AUTH0_CLIENT_ID" ] && echo "[WARN] AUTH0_CLIENT_ID not set; login will fail." || true

exec "$@"
