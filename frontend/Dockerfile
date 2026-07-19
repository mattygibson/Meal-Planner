# ---------------------------------------------------------
# Meal Planner UI — Production Dockerfile
# Built for GreenCloud PaaS (targets linux/amd64 and linux/arm64)
# ---------------------------------------------------------

# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /build

# Copy dependency files first (maximise layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .

# Build with a placeholder API URL — we inject the real one at runtime
ENV VITE_API_URL=__VITE_API_URL_PLACEHOLDER__
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine AS runtime

# Copy built assets
COPY --from=builder /build/dist /usr/share/nginx/html

# Custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Runtime config injection script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
