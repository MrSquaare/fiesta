import { AccountDTO } from "../account";
import { BaseDTO } from "../base";

export type UserDTO = BaseDTO & {
  account_id: string;
  account?: AccountDTO;
  username: string;
  display_name: string;
  biography: string;
  followers_count: number;
  following_count: number;
};
