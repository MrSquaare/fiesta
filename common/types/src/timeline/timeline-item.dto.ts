import { BaseDTO } from "../base";
import { PostDTO } from "../post";
import { UserDTO } from "../user";

import { TimelineDTO } from "./timeline.dto";

export enum TimelineItemType {
  POST,
  REPOST,
  LIKE,
  COMMENT,
}

export type TimelineItemDTO = BaseDTO & {
  timeline_id: string;
  timeline?: TimelineDTO;
  post_id: string;
  post?: PostDTO;
  user_id: string;
  user?: UserDTO;
  type: TimelineItemType;
};
