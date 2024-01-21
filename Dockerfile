FROM node:16-alpine as builder
WORKDIR /app
RUN apk --no-cache add sqlite
COPY package*.json ./
RUN npm ci
ADD . /app
COPY . .
RUN npm run build
EXPOSE 9876
CMD ["npm", "run", "start:prod"]

