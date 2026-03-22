# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: serve ──────────────────────────────────────────────────────────
FROM node:18-alpine

RUN npm install -g serve

COPY --from=builder /app/dist /app/dist

EXPOSE 3741

CMD ["serve", "-l", "3741", "/app/dist"]
