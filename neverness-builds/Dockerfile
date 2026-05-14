# Use Node.js 22.13+ to meet Vite 8.x requirements
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage - use lightweight static server
FROM node:22-alpine AS runner

WORKDIR /app

# Install serve for static file serving
RUN npm install -g serve

# Copy built assets only
COPY --from=builder /app/dist ./dist

# Railway provides PORT env var
ENV PORT=3000

# Create start script that can't be overridden
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'exec serve -s /app/dist -l ${PORT}' >> /start.sh && \
    chmod +x /start.sh

# Use ENTRYPOINT so Railway can't override with npm commands
ENTRYPOINT ["/start.sh"]
