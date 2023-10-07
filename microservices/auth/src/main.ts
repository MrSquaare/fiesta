import { ValidationPipe } from "@microservices/common/dist/pipes";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: process.env.AUTH_BRIDGE_REDIS_HOST || "localhost",
      port: parseInt(process.env.AUTH_BRIDGE_REDIS_PORT || "6379"),
    },
  });

  const port = parseInt(process.env.PORT) || 3002;

  app.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 Auth service is running on: http://localhost:${port}/graphql`);
}

bootstrap();
