FROM node:22-alpine AS builder

# Accept build arguments
ARG VITE_HOST_IP
ARG VITE_COMMAND_PORT  
ARG VITE_QUERY_PORT

# Set as environment variables for the build
ENV VITE_HOST_IP=${VITE_HOST_IP}
ENV VITE_COMMAND_PORT=${VITE_COMMAND_PORT}
ENV VITE_QUERY_PORT=${VITE_QUERY_PORT}

WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

EXPOSE 3000

COPY --from=builder /build/dist ./dist

# Copy runtime entrypoint script
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Default env fallbacks (optional)
ENV VITE_COMMAND_PORT=8181 \
	VITE_QUERY_PORT=8182

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npx", "serve", "-s", "dist","-l","3000"]