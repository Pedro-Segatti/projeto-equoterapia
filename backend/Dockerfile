FROM openjdk:18-jdk-slim

WORKDIR /usr/local/tomcat

RUN apt-get update && \
    apt-get install -y wget && \
    wget https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.73/bin/apache-tomcat-9.0.73.tar.gz && \
    tar -zxvf apache-tomcat-9.0.73.tar.gz --strip-components=1 && \
    rm apache-tomcat-9.0.73.tar.gz && \
    rm -rf webapps/*

COPY /target/equoterapia.war webapps/

COPY /target/lib/* lib/

RUN rm -rf conf/context.xml

COPY /context.xml conf/

EXPOSE 8080

CMD ["bin/catalina.sh", "run"]