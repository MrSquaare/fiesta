import { UserDTO } from "@common/types";

export type GetAccountUserReqMessage = {
  accountId: string;
};

export type GetAccountUserResMessage =
  | {
      user: UserDTO;
    }
  | {
      error: any;
    };
