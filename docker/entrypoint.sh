#!/bin/sh
set -e

# Location where static files are served from (adjust if different)
APP_DIR=/app/dist
CONFIG_FILE="$APP_DIR/config.js"

# Create config.js dynamically from environment variables
cat > "$CONFIG_FILE" <<'EOF'
globalThis.runtimeConfig = {
  HOST_IP: "$HOST_IP",
  COMMAND_PORT: "$COMMAND_PORT",
  QUERY_PORT: "$QUERY_PORT"
};
EOF

# Fallback defaults if variables are empty
sed -i 's/HOST_IP: ""/HOST_IP: "localhost"/' "$CONFIG_FILE"
[ -z "$COMMAND_PORT" ] && sed -i 's/COMMAND_PORT: ""/COMMAND_PORT: "8181"/' "$CONFIG_FILE"
[ -z "$QUERY_PORT" ] && sed -i 's/QUERY_PORT: ""/QUERY_PORT: "8182"/' "$CONFIG_FILE"

echo "Generated runtime config.js:" && cat "$CONFIG_FILE"

exec "$@"