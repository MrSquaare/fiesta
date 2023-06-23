import {
  InitCommunityResMessage,
  InitUserResMessage,
  TIMELINE_BRIDGE_INIT_COMMUNITY,
  TIMELINE_BRIDGE_INIT_USER,
} from "@microservices/common/dist/modules/timeline-bridge";
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { TimelinesService } from "./timelines.service";

@Controller("timelines")
export class TimelinesController {
  constructor(private readonly timelinesService: TimelinesService) {}

  @MessagePattern(TIMELINE_BRIDGE_INIT_COMMUNITY)
  async initCommunity(): Promise<InitCommunityResMessage> {
    try {
      // TODO: Find a way to undo created timelines if one of them fails
      const timeline = await this.timelinesService.create({ item_ids: [] });

      return {
        timeline_id: timeline.id,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  @MessagePattern(TIMELINE_BRIDGE_INIT_USER)
  async timelineCheck(): Promise<InitUserResMessage> {
    try {
      // TODO: Find a way to undo created timelines if one of them fails
      const timeline = await this.timelinesService.create({ item_ids: [] });
      const forYouTimeline = await this.timelinesService.create({
        item_ids: [],
      });
      const followingTimeline = await this.timelinesService.create({
        item_ids: [],
      });

      return {
        timeline_id: timeline.id,
        for_you_timeline_id: forYouTimeline.id,
        following_timeline_id: followingTimeline.id,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
