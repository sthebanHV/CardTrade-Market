FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /opt
ADD https://services.gradle.org/distributions/gradle-8.5-bin.zip /tmp/gradle.zip
RUN jar xf /tmp/gradle.zip && rm /tmp/gradle.zip
ENV PATH="/opt/gradle-8.5/bin:$PATH"
ENV GRADLE_OPTS="-Dorg.gradle.daemon=false -Dorg.gradle.jvmargs=-Xmx448m -XX:MaxMetaspaceSize=192m"
WORKDIR /app
COPY build.gradle ./
COPY src/ src/
RUN gradle bootJar --no-daemon -x test

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=55.0", "-XX:MaxMetaspaceSize=160m", "-jar", "app.jar"]
