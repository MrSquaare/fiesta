import { BaseDTO } from "../base";
import { UserDTO } from "../user";

export type CommunityDTO = BaseDTO & {
  name: string;
  description?: string;
  creator_id?: string;
  creator?: UserDTO;
  is_official: boolean;
  is_verified: boolean;
};
