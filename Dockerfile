FROM node:alpine

RUN mkdir /bitSpeed

WORKDIR /bitSpeed

COPY . .

RUN npm i 

RUN npm i -g nodemon

CMD [ "npm","run","dev" ]