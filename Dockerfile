FROM node:20.17.0

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml tsconfig.json ./

RUN pnpm install

COPY src/ ./src/

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
