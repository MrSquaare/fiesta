import { Follower } from "@microservices/types/dist/follower";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "../users/users.module";

import { FollowersResolver } from "./followers.resolver";
import { FollowersService } from "./followers.service";

@Module({
  imports: [TypeOrmModule.forFeature([Follower]), UsersModule],
  providers: [FollowersResolver, FollowersService],
})
export class FollowersModule {}
