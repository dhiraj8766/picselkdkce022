FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17

WORKDIR /app
COPY --from=build /app/target/picselb-1.0.0.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/picselb-1.0.0.jar"]