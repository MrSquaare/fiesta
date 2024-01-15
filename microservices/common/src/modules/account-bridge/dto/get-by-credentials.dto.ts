import { AccountDTO } from "@common/types";

export type GetByCredentialsReqMessage = {
  email: string;
  password: string;
};

export type GetByCredentialsResMessage =
  | {
      account: AccountDTO;
    }
  | {
      error: any;
    };
