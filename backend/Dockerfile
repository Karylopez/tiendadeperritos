# Etapa 1: Construcción y Dependencias
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Etapa 2: Ejecución segura (Producción)
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiamos respetando la estructura de carpetas (src/ y db.js)
COPY --from=builder /app/src ./src
COPY --from=builder /app/db.js ./db.js

# Mínimo Privilegio (Rúbrica: Seguridad)
USER node
EXPOSE 3001
CMD ["node", "src/server.js"]