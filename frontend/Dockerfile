FROM node:20.5-alpine AS base

FROM base AS builder
WORKDIR /app
COPY package.json  package-lock.json* ./
RUN npm ci
COPY . ./
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_ENDPOINT}
ARG NEXT_PUBLIC_MINI_APP_LINK
ENV NEXT_PUBLIC_MINI_APP_LINK=${NEXT_PUBLIC_MINI_APP_LINK}
ARG GRAPHQL_SERVER_ENDPOINT
ENV GRAPHQL_SERVER_ENDPOINT=${GRAPHQL_SERVER_ENDPOINT}
RUN npm run build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
ENV NEXT_TELEMETRY_DISABLED 1
USER nextjs
CMD ["node", "server.js"]
