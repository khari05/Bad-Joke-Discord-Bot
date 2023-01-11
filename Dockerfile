FROM node:16

WORKDIR /app

RUN mkdir /app/data && chown node /app/data

COPY ./package*.json ./

RUN npm install --production

COPY . .

USER node

CMD [ "npm", "start" ]