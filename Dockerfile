ARG base_image

FROM ${base_image}

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn
COPY . /app/

CMD ["yarn", "start", "-s"]
