# Creating multi-stage build for production
FROM node:18-alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1


WORKDIR /opt/
COPY package.json  ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production
ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:18-alpine
RUN apk add --no-cache vips-dev

ARG STRAPI_NODE_ENV
ENV NODE_ENV=${STRAPI_NODE_ENV}

ARG STRAPI_APP_KEYS
ENV APP_KEYS=${STRAPI_APP_KEYS}

ARG STRAPI_API_TOKEN_SALT
ENV API_TOKEN_SALT=${STRAPI_API_TOKEN_SALT}

ARG STRAPI_ADMIN_JWT_SECRET
ENV ADMIN_JWT_SECRET=${STRAPI_ADMIN_JWT_SECRET}

ARG STRAPI_TRANSFER_TOKEN_SALT
ENV TRANSFER_TOKEN_SALT=${STRAPI_TRANSFER_TOKEN_SALT}

ARG DATABASE_CLIENT
ENV DATABASE_CLIENT=${DATABASE_CLIENT}

ARG DATABASE_HOST
ENV DATABASE_HOST=${DATABASE_HOST}

ARG DATABASE_PORT
ENV DATABASE_PORT=${DATABASE_PORT}

ARG DATABASE_NAME
ENV DATABASE_NAME=${DATABASE_NAME}

ARG DATABASE_USERNAME
ENV DATABASE_USERNAME=${DATABASE_USERNAME}

ARG DATABASE_PASSWORD
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}

ARG DATABASE_SSL
ENV DATABASE_SSL=${DATABASE_SSL}

ARG STRAPI_JWT_SECRET
ENV JWT_SECRET=${STRAPI_JWT_SECRET}

WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "develop"]
