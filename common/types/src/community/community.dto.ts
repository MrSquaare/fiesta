import { BaseDTO } from "../base";
import { TimelineDTO } from "../timeline";
import { UserDTO } from "../user";

export type CommunityDTO = BaseDTO & {
  name: string;
  description: string;
  creator_id?: string;
  creator?: UserDTO;
  members_count: number;
  timeline_id: string;
  timeline?: TimelineDTO;
  is_official: boolean;
  is_verified: boolean;
};
