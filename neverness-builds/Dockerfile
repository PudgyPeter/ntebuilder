# Use Node.js 22.13+ to meet Vite 8.x requirements
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the frontend
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Copy package files and install production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Copy server and API source files (tsx runs them directly)
COPY server.ts ./
COPY api/ ./api/
COPY src/types/ ./src/types/

# Railway provides PORT env var
ENV PORT=3000

# Start the Express server with tsx
ENTRYPOINT ["npx", "tsx", "server.ts"]
