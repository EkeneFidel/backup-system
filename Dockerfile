FROM node:18-alpine as production

WORKDIR /usr/src/app

COPY package*.json .
COPY yarn.lock .

RUN yarn install && yarn global add typescript

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/index.js"]