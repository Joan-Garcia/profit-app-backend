FROM node:16.13

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build:prod

CMD [ "npm", "run", "start:prod" ]
