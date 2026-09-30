# ─── Stage 1: Build the frontend ─────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install frontend dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy frontend source and build
COPY . .
RUN npm run build

# ─── Stage 2: Production image ───────────────────────────────────
FROM node:20-alpine

# better-sqlite3 needs build tools
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy server source
COPY server/package.json server/package-lock.json ./server/
WORKDIR /app/server
RUN npm ci --omit=dev

# Copy server code
WORKDIR /app
COPY server/ ./server/

# Copy the built frontend from stage 1
COPY --from=builder /app/dist ./dist

# Copy public assets (images etc.)
COPY public/ ./dist/

# Persistent data directory for SQLite database
RUN mkdir -p /data
ENV DATA_DIR=/data

WORKDIR /app/server

EXPOSE 3001
ENV PORT=3001

CMD ["node", "server.js"]
