import { AccountDTO } from "@common/types";

export type CheckAccountReqMessage = {
  id: string;
};

export type CheckAccountResMessage =
  | {
      account: AccountDTO;
    }
  | {
      error: any;
    };
