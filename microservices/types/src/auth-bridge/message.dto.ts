import { AccountDTO } from "@common/types";

export type AuthCheckReqMessage = {
  token: string;
};

export type AuthCheckResMessage = {
  valid: boolean;
  account?: AccountDTO;
  error?: any;
};
