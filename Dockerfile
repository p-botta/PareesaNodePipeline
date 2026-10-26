# --- Install production dependencies ---
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# --- Runtime image ---
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=deps /app/node_modules /usr/src/app/node_modules
COPY . .

ARG APP_VERSION=dev
ENV NODE_ENV=production \
    APP_VERSION=${APP_VERSION}

EXPOSE 3000

CMD ["node", "src/index.js"]
