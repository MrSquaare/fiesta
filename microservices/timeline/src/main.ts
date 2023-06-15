import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 3006;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  Logger.log(
    `🚀 Timeline service is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
