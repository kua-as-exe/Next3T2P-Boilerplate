FROM node:16-alpine AS development

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

WORKDIR /app

RUN npm install -g ts-node

COPY ./package.json .

RUN if [ "$NODE_ENV" = "production" ]; then NODE_ENV=development npm install; fi

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

EXPOSE 80

CMD ["npm", "run", "start"]

