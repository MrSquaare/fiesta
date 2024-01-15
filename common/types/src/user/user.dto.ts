import { AccountDTO } from "../account";
import { BaseDTO } from "../base";
import { TimelineDTO } from "../timeline";

export type UserDTO = BaseDTO & {
  account_id: string;
  account?: AccountDTO;
  username: string;
  display_name: string;
  biography: string;
  followers_count: number;
  following_count: number;
  timeline_id: string;
  timeline?: TimelineDTO;
  for_you_timeline_id: string;
  for_you_timeline?: TimelineDTO;
  following_timeline_id: string;
  following_timeline?: TimelineDTO;
  is_official: boolean;
  is_verified: boolean;
};