FROM node:16.15-alpine as builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

FROM node:16.15-alpine as runner
WORKDIR /app

COPY --from=builder /app/.env ./.env
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/node_modules ./node_modules

CMD ["yarn", "dev"]
