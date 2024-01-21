FROM node:16-alpine

WORKDIR /app

RUN apk --no-cache add sqlite

COPY package*.json ./
RUN npm install
ARG CACHEBUST=1

COPY .. .
RUN npm run build

CMD ["npm", "run", "start:prod"]
