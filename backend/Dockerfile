FROM node:alpine

WORKDIR /usr/src

COPY ["package.json", "package-lock.json", "/usr/src/"]

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 3001

CMD ["node", "index.js"]