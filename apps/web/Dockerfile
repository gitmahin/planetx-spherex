FROM node:24-alpine AS base


# ******************************PRUNE THE PROJECT*********************************
FROM base AS pruner
RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

# ******************************INSTALLATION**************************************
FROM base AS installer

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/turbo.json ./turbo.json

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn install --frozen-lockfile --production=false; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ******************************BUILD THE APP*************************************
FROM base AS builder

WORKDIR /app

COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .


ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the main app
RUN if [ -f package-lock.json ]; then \
    npm turbo run build; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn turbo run build; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm &&  pnpm turbo run build; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ******************************RUN THE APP***********************************
FROM base AS runner
WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 react
RUN adduser --system --uid 1001 tanstack
USER tanstack

COPY --from=builder --chown=tanstack:react  /app/apps/web/package*.json ./apps/web/
# copy web node_modules
COPY --from=builder --chown=tanstack:react /app/apps/web/node_modules ./apps/web/node_modules/
# copry root node_modules
COPY --from=builder --chown=tanstack:react /app/node_modules ./node_modules/
COPY --from=builder --chown=tanstack:react /app/apps/web/.output ./apps/web/.output/
COPY --from=builder --chown=tanstack:react /app/packages/ ./packages/

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD [ "node", "apps/web/.output/server/index.mjs" ]