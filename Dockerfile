FROM node:18-alpine3.19 AS BUILD_IMAGE
RUN apk --update add curl bash

RUN mkdir /app
WORKDIR /app

COPY ["./package.json", "tsconfig.json", "package-lock.json", "./"]
RUN npm install --production
COPY src ./src
RUN npm run build

FROM node:18-alpine3.19
WORKDIR /app
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

EXPOSE 80

CMD ["node", "dist"]
