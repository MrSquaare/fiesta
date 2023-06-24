import { TimelineBridgeModule } from "@microservices/common/dist/modules/timeline-bridge";
import { User } from "@microservices/types/dist/user";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from "./users.controller";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TimelineBridgeModule.forRoot({
      redisHost: process.env.TIMELINE_BRIDGE_REDIS_HOST || "localhost",
      redisPort: parseInt(process.env.TIMELINE_BRIDGE_REDIS_PORT || "6379"),
    }),
  ],
  providers: [UsersResolver, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
