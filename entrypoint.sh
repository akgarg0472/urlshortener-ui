#!/bin/sh

echo "Starting entrypoint script..."

echo "Substituting environment variables into env-config.js..."

envsubst < /usr/share/nginx/html/env-config.js.template > /usr/share/nginx/html/env-config.js

echo "Environment variables substituted successfully into /usr/share/nginx/html/env-config.js."

echo "Starting Nginx..."

exec nginx -g 'daemon off;'
