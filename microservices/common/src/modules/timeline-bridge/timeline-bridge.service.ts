import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";

import { getErrorException } from "../../helpers/error";

import {
  InitCommunityReqMessage,
  InitCommunityResMessage,
  InitUserReqMessage,
  InitUserResMessage,
} from "./dto";
import {
  TIMELINE_BRIDGE_INIT_COMMUNITY,
  TIMELINE_BRIDGE_INIT_USER,
  TIMELINE_BRIDGE_NAME,
} from "./timeline-bridge.constants";

@Injectable()
export class TimelineBridgeService {
  constructor(
    @Inject(TIMELINE_BRIDGE_NAME)
    private readonly timelinesClient: ClientProxy
  ) {}

  async initCommunity(communityId: string) {
    const reqMsg: InitCommunityReqMessage = { community_id: communityId };
    const resMsg: InitCommunityResMessage = await firstValueFrom(
      this.timelinesClient
        .send(TIMELINE_BRIDGE_INIT_COMMUNITY, reqMsg)
        .pipe(timeout(5000))
    );

    if ("error" in resMsg) {
      throw getErrorException(resMsg.error);
    }

    return {
      timelineId: resMsg.timeline_id,
    };
  }

  async initUser(userId: string) {
    const reqMsg: InitUserReqMessage = { user_id: userId };
    const resMsg: InitUserResMessage = await firstValueFrom(
      this.timelinesClient
        .send(TIMELINE_BRIDGE_INIT_USER, reqMsg)
        .pipe(timeout(5000))
    );

    if ("error" in resMsg) {
      throw resMsg.error;
    }

    return {
      timelineId: resMsg.timeline_id,
      forYouTimelineId: resMsg.for_you_timeline_id,
      followingTimelineId: resMsg.following_timeline_id,
    };
  }
}
