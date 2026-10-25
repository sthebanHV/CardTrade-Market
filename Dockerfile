FROM gradle:8.5-jdk17 AS build
WORKDIR /app
ENV GRADLE_OPTS="-Dorg.gradle.daemon=false -Dorg.gradle.jvmargs=-Xmx448m -XX:MaxMetaspaceSize=192m"
COPY build.gradle .
COPY src/ src/
RUN gradle bootJar --no-daemon -x test

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=55.0", "-XX:MaxMetaspaceSize=160m", "-jar", "app.jar"]
