#build
FROM node:lts-alpine as build
COPY . .
WORKDIR /app
RUN npm install
RUN npm run build --prod

#run
FROM nginxinc/nginx-unprivileged:1.22
COPY --from=build /app/dist/app /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=nginx:nginx /app/dist/app/assets/env.js /usr/share/nginx/html/assets/env.js
EXPOSE 8080

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]