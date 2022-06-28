# Builder
FROM node:16.14-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ARG APP=app
ENV APP=${APP}

RUN yarn build ${APP}

# Production
FROM node:16.14-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

COPY --from=builder /usr/src/app/dist ./dist
