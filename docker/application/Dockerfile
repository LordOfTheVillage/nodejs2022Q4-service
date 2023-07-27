FROM node:18
WORKDIR /app
COPY package*.json ./
COPY ../../tsconfig.json ./
COPY ../../tsconfig.build.json ./
COPY ../../doc/api.yaml ./doc/
COPY ../../prisma ./prisma/
RUN npm install --legacy-peer-deps
RUN npx prisma generate
COPY ../../src .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]