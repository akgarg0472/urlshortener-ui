#!/bin/sh

echo "Starting entrypoint script..."

echo "Substituting environment variables into env-config.js..."
envsubst < /usr/share/nginx/html/env-config.js.template > /usr/share/nginx/html/env-config.js
echo "Environment variables substituted successfully into /usr/share/nginx/html/env-config.js."

sed -i 's|<!-- ::DOCKER_ENV_CONFIG:: -->|<script src="/env-config.js"></script>|' /usr/share/nginx/html/index.html

echo "Starting Nginx..."

exec nginx -g 'daemon off;'
