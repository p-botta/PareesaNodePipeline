ARG APP_VERSION=dev

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production \
    APP_VERSION=${APP_VERSION}

EXPOSE 3000

CMD ["node", "src/index.js"]
