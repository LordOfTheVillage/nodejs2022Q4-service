FROM node:lts-bullseye-slim
WORKDIR /app
COPY package*.json ./
COPY ../../tsconfig*.json ./
COPY ../../prisma ./prisma/
COPY ../../.env ./.env
COPY ../../src ./src/
COPY ../../nest-cli.json ./nest-cli.json
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "start:dev"]