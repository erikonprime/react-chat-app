FROM node:latest

WORKDIR /var/www/app

RUN npm install -g npm@10.8.1

COPY . /var/www/app
RUN groupadd -o -g 1001 app \
    && useradd -o -u 1001 -g app -G root -d /var/www/app app

USER 1001:1001

EXPOSE 3000
CMD ["node"]
