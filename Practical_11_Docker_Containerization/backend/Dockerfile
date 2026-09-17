# Practical 11: Backend Dockerfile (Node.js Alpine)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package manifests first for optimal Docker layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose backend service port
EXPOSE 5000

# Set environment defaults
ENV NODE_ENV=production
ENV PORT=5000

# Start Express server
CMD ["node", "server.js"]
