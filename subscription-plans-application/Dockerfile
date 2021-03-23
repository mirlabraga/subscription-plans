FROM node:12.10.0

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

ADD . /usr/src/app

# for production it should build and then expose with a http server like nginx or a simple one
#RUN npm build

CMD [ "npm", "start" ]

EXPOSE 3000
