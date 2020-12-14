FROM node:14-alpine

WORKDIR /client

COPY package*.json /client/

RUN yarn install

COPY . .