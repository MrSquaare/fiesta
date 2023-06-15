import { User } from "@microservices/types/dist/user";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
