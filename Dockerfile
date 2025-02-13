# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

COPY build /app/build
COPY nginx.conf ./
COPY entrypoint.sh ./

# Step 2: Serve the React app using Nginx
FROM nginx:alpine

COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/build/env-config.js.template /usr/share/nginx/html/env-config.js.template

COPY --from=build /app/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80
