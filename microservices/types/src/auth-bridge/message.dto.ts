import { AccountDTO, AccountRole } from "@common/types";

export type AuthCheckReqMessage = {
  token: string;
  roles?: AccountRole[];
};

export type AuthCheckResMessage = {
  valid: boolean;
  account?: AccountDTO;
  error?: any;
};
