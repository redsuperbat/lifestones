FROM node:22.8.0-alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm@8.15.6

RUN pnpm install

RUN pnpm build

WORKDIR server

ENV LOG_FORMAT=google
ENV PORT=3000

CMD ["pnpm", "start"]

