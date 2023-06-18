import { ValidationPipe } from "@microservices/common/dist/pipes";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const port = parseInt(process.env.PORT) || 3001;

  await app.listen(port);

  Logger.log(
    `🚀 Accounts service is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
