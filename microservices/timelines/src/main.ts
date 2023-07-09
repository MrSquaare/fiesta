import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 3006;

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: process.env.TIMELINE_BRIDGE_REDIS_HOST || "localhost",
      port: parseInt(process.env.TIMELINE_BRIDGE_REDIS_PORT || "6379"),
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(
    `🚀 Timeline service is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
