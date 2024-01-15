import { BaseDTO } from "../base";
import { UserDTO } from "../user";

export type FollowerDTO = BaseDTO & {
  user_id: string;
  follower_id: string;
  user: UserDTO;
  follower: UserDTO;
};
