FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install

RUN npx nx run-many --target=build --all

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/api-server ./api-server
COPY --from=builder /app/dist/apps/parsing-batch ./parsing-batch