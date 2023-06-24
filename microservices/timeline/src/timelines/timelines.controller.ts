import {
  InitCommunityReqMessage,
  InitCommunityResMessage,
  InitUserReqMessage,
  InitUserResMessage,
  TIMELINE_BRIDGE_INIT_COMMUNITY,
  TIMELINE_BRIDGE_INIT_USER,
} from "@microservices/common/dist/modules/timeline-bridge";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { TimelinesService } from "./timelines.service";

@Controller("timelines")
export class TimelinesController {
  constructor(private readonly timelinesService: TimelinesService) {}

  @MessagePattern(TIMELINE_BRIDGE_INIT_COMMUNITY)
  async initCommunity(
    @Payload() reqMsg: InitCommunityReqMessage
  ): Promise<InitCommunityResMessage> {
    try {
      const [timeline] = await this.timelinesService.initCommunity(
        reqMsg.community_id
      );

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
  async timelineCheck(
    @Payload() reqMsg: InitUserReqMessage
  ): Promise<InitUserResMessage> {
    try {
      const [timeline, forYouTimeline, followingTimeline] =
        await this.timelinesService.initUser(reqMsg.user_id);

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
