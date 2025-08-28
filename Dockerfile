FROM node:22-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /build/dist ./dist

CMD ["npx", "serve", "-s", "dist"]