FROM node:22-alpine AS builder

# Accept build arguments
ARG HOST_IP
ARG COMMAND_PORT  
ARG QUERY_PORT
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_ID

# Set as environment variables for the build
ENV HOST_IP=${HOST_IP}
ENV COMMAND_PORT=${COMMAND_PORT}
ENV QUERY_PORT=${QUERY_PORT}
ENV AUTH0_DOMAIN=${AUTH0_DOMAIN}
ENV AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}

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
ENV COMMAND_PORT=8181
ENV QUERY_PORT=8182

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npx", "serve", "-s", "dist","-l","3000"]