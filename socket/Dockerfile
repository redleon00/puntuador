FROM node:alpine

WORKDIR /usr/src

COPY ["package.json", "/usr/src/"]


RUN npm install

#RUN npm install pm2 -g

COPY [".", "/usr/src/"]

EXPOSE 5000

CMD ["node", "index.js"]