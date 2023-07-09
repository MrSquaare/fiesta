import { Timeline } from "@microservices/types/dist/timeline";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TimelinesController } from "./timelines.controller";
import { TimelinesResolver } from "./timelines.resolver";
import { TimelinesService } from "./timelines.service";

@Module({
  imports: [TypeOrmModule.forFeature([Timeline])],
  providers: [TimelinesResolver, TimelinesService],
  controllers: [TimelinesController],
  exports: [TimelinesService],
})
export class TimelinesModule {}
