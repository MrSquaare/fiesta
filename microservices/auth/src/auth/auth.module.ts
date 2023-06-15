import { Account } from "@microservices/types/dist/account";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AuthResolver, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
