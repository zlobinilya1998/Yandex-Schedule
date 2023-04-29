FROM node:14.18.0
WORKDIR /usr/src/app
COPY package*.json ./
ENV COOKIE=PHPSESSID=2sj06r62dfdv71gljk6otdouks
RUN npm i
COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]