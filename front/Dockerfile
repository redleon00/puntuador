FROM node:latest as build-stage

WORKDIR /app

COPY ["package.json", "package-lock.json", "/app/"]

RUN npm install

COPY [".", "/app/"] 

RUN npm run build

FROM nginx:alpine as production-stage

RUN mkdir /app

COPY --from=build-stage ["/app/dist", "/app"]

COPY ["./nginx/nginx.conf", "/etc/nginx/nginx.conf"] 


# COPY ["nginx.key", "/etc/ssl"]

# COPY ["nginx.crt", "/etc/ssl"]

EXPOSE 80