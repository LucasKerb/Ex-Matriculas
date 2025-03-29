FROM node:20-alpine

RUN npm install -g pnpm@8.6.7

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm prisma generate

EXPOSE 5000

CMD ["pnpm", "start:dev"]
