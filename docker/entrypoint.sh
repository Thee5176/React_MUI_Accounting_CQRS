#!/bin/sh
set -e

# Location where static files are served from (adjust if different)
APP_DIR=/app/dist
CONFIG_FILE="$APP_DIR/config.js"

# Create config.js dynamically from environment variables
cat > "$CONFIG_FILE" <<'EOF'
window.runtimeConfig = {
  VITE_HOST_IP: "$VITE_HOST_IP",
  VITE_COMMAND_PORT: "$VITE_COMMAND_PORT",
  VITE_QUERY_PORT: "$VITE_QUERY_PORT"
};
EOF

# Fallback defaults if variables are empty
sed -i 's/VITE_HOST_IP: ""/VITE_HOST_IP: "localhost"/' "$CONFIG_FILE"
[ -z "$VITE_COMMAND_PORT" ] && sed -i 's/VITE_COMMAND_PORT: ""/VITE_COMMAND_PORT: "8181"/' "$CONFIG_FILE"
[ -z "$VITE_QUERY_PORT" ] && sed -i 's/VITE_QUERY_PORT: ""/VITE_QUERY_PORT: "8182"/' "$CONFIG_FILE"

echo "Generated runtime config.js:" && cat "$CONFIG_FILE"

exec "$@"