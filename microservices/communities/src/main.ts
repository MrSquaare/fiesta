import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 3004;

  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  await app.listen(port);

  Logger.log(
    `🚀 Communities service is running on: http://localhost:${port}/graphql`,
  );
}

bootstrap();
