import { AccountBridgeModule } from "@microservices/common/dist/modules/account-bridge";
import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    AccountBridgeModule.forRoot({
      redisHost: process.env.ACCOUNT_BRIDGE_REDIS_HOST || "localhost",
      redisPort: parseInt(process.env.ACCOUNT_BRIDGE_REDIS_PORT || "6379"),
    }),
  ],
  providers: [AuthResolver, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
