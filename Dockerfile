# create Docker image from scratch
FROM node:alpine as node
WORKDIR /front

RUN apk add git
RUN git clone https://github.com/slivniy/teletronics.git \
    && cd teletronics \
    && npm install \
    && npm run build --configuration=production

FROM nginx:alpine
COPY --from=node /front/teletronics/dist/teletronics /usr/share/nginx/html

# create Docker image from prebuilded source
#FROM nginx:alpine
#COPY dist/teletronics /usr/share/nginx/html
