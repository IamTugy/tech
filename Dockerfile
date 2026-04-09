FROM oven/bun:1 AS base
WORKDIR /app

# Install deps
FROM base AS install
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Build frontend
FROM base AS build
COPY --from=install /app/node_modules node_modules
COPY . .
RUN bun run build

# Production image — Bun serves both API and static files
FROM oven/bun:1 AS release
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server/ ./server/
COPY package.json ./

EXPOSE 3000
CMD ["bun", "server/index.ts"]
