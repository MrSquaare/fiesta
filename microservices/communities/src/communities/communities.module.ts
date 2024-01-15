import { Community } from "@microservices/types/dist/community";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommunitiesResolver } from "./communities.resolver";
import { CommunitiesService } from "./communities.service";

@Module({
  imports: [TypeOrmModule.forFeature([Community])],
  providers: [CommunitiesResolver, CommunitiesService],
})
export class CommunitiesModule {}
