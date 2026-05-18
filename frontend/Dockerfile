FROM alpine:3.19 AS builder
WORKDIR /app
COPY index.html ./
COPY app.js ./
COPY default.conf ./

FROM nginxinc/nginx-unprivileged:1.25-alpine AS runner
COPY --from=builder /app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/index.html /usr/share/nginx/html/index.html
COPY --from=builder /app/app.js /usr/share/nginx/html/app.js
EXPOSE 8080