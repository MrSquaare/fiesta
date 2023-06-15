import { BaseDTO } from "../../base";

export type UserDTO = BaseDTO & {
  username: string;
  display_name: string;
  biography: string;
  followers_count: number;
  following_count: number;
};
