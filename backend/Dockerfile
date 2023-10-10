FROM node:20.5-alpine AS base

FROM base AS dependencies
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build
WORKDIR /backend
COPY . .
COPY --from=dependencies /backend/node_modules ./node_modules
ENV NODE_ENV production
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

USER node

FROM base AS deploy
WORKDIR /backend
COPY --from=build /backend/dist/ ./dist/
COPY --from=build /backend/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]
