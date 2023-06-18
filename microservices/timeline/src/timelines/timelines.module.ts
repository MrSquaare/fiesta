import { Timeline } from "@microservices/types/dist/timeline";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TimelinesResolver } from "./timelines.resolver";
import { TimelinesService } from "./timelines.service";

@Module({
  imports: [TypeOrmModule.forFeature([Timeline])],
  providers: [TimelinesResolver, TimelinesService],
})
export class TimelinesModule {}
