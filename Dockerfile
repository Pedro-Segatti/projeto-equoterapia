FROM mysql:5.7

EXPOSE 3306

COPY ./db/ /docker-entrypoint-initdb.d/