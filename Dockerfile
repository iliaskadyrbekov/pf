FROM node:12-alpine3.12  AS BUILD_IMAGE

# couchbase sdk requirements
RUN apk --update add yarn curl bash g++ make && rm -rf /var/cache/apk/*


WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile

COPY . .

# build application
RUN yarn build

FROM node:12-alpine3.12

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/.next ./.next
COPY --from=BUILD_IMAGE /usr/src/app/public ./public
COPY --from=BUILD_IMAGE /usr/src/app/package.json ./package.json
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/next.config.js ./next.config.js

ARG PORT
EXPOSE $PORT

ENV PORT=${PORT}

CMD [ "yarn", "start" ]