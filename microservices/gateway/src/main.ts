import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as dotenv from "dotenv";

dotenv.config();

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT) || 3000;

  app.enableCors();
  await app.listen(port);

  Logger.log(`🚀 Gateway is running on: http://localhost:${port}/graphql`);
}

bootstrap();
