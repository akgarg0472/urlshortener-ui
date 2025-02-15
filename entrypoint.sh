#!/bin/sh

echo "Starting entrypoint script..."

echo "Substituting environment variables into env-config.js..."
envsubst < /usr/share/nginx/html/env-config.js.template > /usr/share/nginx/html/env-config.js
echo "Environment variables substituted successfully into /usr/share/nginx/html/env-config.js."

if [ -f /.dockerenv ]; then
  echo "Running inside Docker. Injecting env-config.js into index.html..."
  sed -i 's|<!-- ::DOCKER_ENV_CONFIG:: -->|<script src="/env-config.js"></script>|' /usr/share/nginx/html/index.html
else
  echo "Not running in Docker. Skipping env-config.js injection."
  sed -i 's|<!-- ::DOCKER_ENV_CONFIG:: -->||' /usr/share/nginx/html/index.html
fi

# Step 3: Start Nginx
echo "Starting Nginx..."

exec nginx -g 'daemon off;'