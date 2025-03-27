FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM busybox:1.37 AS runner
WORKDIR /app
COPY --from=builder /app/dist .
CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]