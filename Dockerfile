FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json
RUN yarn
COPY . /app/

CMD ["yarn", "start", "-s"]
