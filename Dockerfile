FROM node:21

WORKDIR /app

RUN mkdir /app/data && chown node /app/data

COPY ./package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

USER node

CMD [ "npm", "start" ]