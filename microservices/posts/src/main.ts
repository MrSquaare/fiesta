import { ValidationPipe } from "@microservices/common/dist/pipes";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 3005;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  Logger.log(
    `🚀 Posts service is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
