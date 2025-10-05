FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY pom.xml ./
COPY src ./src

RUN ./mvnw -v || true
RUN apt-get update && apt-get install -y maven

RUN mvn -q -e -DskipTests=true clean package

EXPOSE 8080
ENV PORT=8080

CMD [ java, -jar, target/product-api-1.0.0.jar]

