FROM node:16.15-alpine as builder
WORKDIR /app

ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY . .
RUN yarn build

FROM node:16.15-alpine as runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/build ./

CMD ["node", "index.js"]
