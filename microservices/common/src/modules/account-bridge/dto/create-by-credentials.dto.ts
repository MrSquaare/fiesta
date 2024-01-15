import { AccountDTO } from "@common/types";

export type CreateByCredentialsReqMessage = {
  email: string;
  password: string;
};

export type CreateByCredentialsResMessage =
  | {
      account: AccountDTO;
    }
  | {
      error: any;
    };
