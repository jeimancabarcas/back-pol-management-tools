# ==========================================
# 1. BUILD STAGE (Compilación de la App)
# ==========================================
FROM node:26-alpine AS builder

# Instalar herramientas para compilar módulos nativos (ej. bcrypt)
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copiar manifiestos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para compilar)
RUN npm ci

# Copiar código fuente y configuración de compilación
COPY tsconfig*.json nest-cli.json ./
COPY src/ ./src/

# Compilar TypeScript a JavaScript (dist/)
RUN npm run build

# Eliminar dependencias de desarrollo para optimizar tamaño final
RUN npm prune --omit=dev

# ==========================================
# 2. PRODUCTION RUNNER STAGE (Imagen Final)
# ==========================================
FROM node:26-alpine AS runner

WORKDIR /usr/src/app

# Variables de entorno por defecto en producción
ENV NODE_ENV=production
ENV PORT=3003

# Copiar únicamente los archivos necesarios desde la etapa de compilación
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Usar usuario no privilegiado 'node' incluido en la imagen de Alpine por seguridad
USER node

# Exponer el puerto configurado (3003 por defecto en Coolify)
EXPOSE 3003

# Iniciar la aplicación NestJS
CMD ["node", "dist/main.js"]
