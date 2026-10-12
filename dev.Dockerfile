FROM node:18-alpine3.19
RUN apk --update add curl

RUN mkdir /app
WORKDIR /app

COPY ["package.json", "tsconfig.json", "debug.sh", "package-lock.json", "./"]

EXPOSE 80

CMD ["sh", "debug.sh"]
