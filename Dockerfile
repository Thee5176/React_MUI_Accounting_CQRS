FROM node:22-alpine AS builder

WORKDIR /app

COPY /dist ./dist

CMD ["npx", "serve", "-s", "dist"]