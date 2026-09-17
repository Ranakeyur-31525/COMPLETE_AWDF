# Practical 11: Multi-Stage Frontend Dockerfile (Supplementary Problem 2)
# Stage 1: Build static production assets
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve using ultra-lightweight Nginx Alpine image (~22MB)
FROM nginx:1.25-alpine

# Copy custom Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
