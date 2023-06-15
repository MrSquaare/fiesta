import { UserBridgeModule } from "@microservices/common/dist/modules/user-bridge";
import { Post } from "@microservices/types/dist/post";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserBridgeModule.forRoot({
      redisHost: process.env.USER_BRIDGE_REDIS_HOST || "localhost",
      redisPort: parseInt(process.env.USER_BRIDGE_REDIS_PORT || "6379"),
    }),
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
