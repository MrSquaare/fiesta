import { TimelineItem } from "@microservices/types/dist/timeline";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TimelinesModule } from "../timelines/timelines.module";

import { TimelineItemsResolver } from "./timeline-items.resolver";
import { TimelineItemsService } from "./timeline-items.service";

@Module({
  imports: [TypeOrmModule.forFeature([TimelineItem]), TimelinesModule],
  providers: [TimelineItemsResolver, TimelineItemsService],
})
export class TimelineItemsModule {}
