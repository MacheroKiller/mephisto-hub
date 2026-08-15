# ---- Stage 1: Build ----
FROM oven/bun:1 AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun nx build hub --configuration=production

# ---- Stage 2: Serve ----
FROM nginx:alpine AS serve

COPY --from=build /app/dist/apps/hub/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80