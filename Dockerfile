FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Використовуємо змінну середовища для API ключа
ENV PROMUA_API_KEY=""
ENV PROMUA_API_URL="https://my.prom.ua"

ENTRYPOINT ["node", "dist/index.js"]