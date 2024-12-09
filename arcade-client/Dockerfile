FROM node:18-alpine
WORKDIR /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY tsconfig.json ./tsconfig.json

RUN npm install

ADD application ./application
ADD components ./components
ADD domain ./domain
ADD lib ./lib
ADD pages ./pages
ADD public ./public
ADD services ./services

ARG NEXT_PUBLIC_YJS_ENDPOINT
ENV NEXT_PUBLIC_YJS_ENDPOINT=${NEXT_PUBLIC_YJS_ENDPOINT}
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_API_KEY=${NEXT_PUBLIC_FIREBASE_API_KEY}
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=${NEXT_PUBLIC_FIREBASE_PROJECT_ID}
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=${NEXT_PUBLIC_FIREBASE_APP_ID}
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}
ARG NEXT_PUBLIC_TEST_MODE
ENV NEXT_PUBLIC_TEST_MODE=${NEXT_PUBLIC_TEST_MODE}
ARG NEXT_PUBLIC_EMAILJS_SERVICE_ID
ENV NEXT_PUBLIC_EMAILJS_SERVICE_ID=${NEXT_PUBLIC_EMAILJS_SERVICE_ID}
ARG NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
ENV NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=${NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}
ARG NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
ENV NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=${NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}
ARG NEXT_PUBLIC_STRAPI_API_ENDPOINT
ENV NEXT_PUBLIC_STRAPI_API_ENDPOINT=${NEXT_PUBLIC_STRAPI_API_ENDPOINT}
ARG NEXT_PUBLIC_STRAPI_API_TOKEN_KEY
ENV NEXT_PUBLIC_STRAPI_API_TOKEN_KEY=${NEXT_PUBLIC_STRAPI_API_TOKEN_KEY}
ARG NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
ENV NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=${NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}

RUN npm run build
CMD npm run start