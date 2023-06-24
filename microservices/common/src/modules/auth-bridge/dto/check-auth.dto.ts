import { AccountDTO, AccountRole } from "@common/types";

export type CheckAuthReqMessage = {
  token: string;
  roles?: AccountRole[];
};

export type CheckAuthResMessage = {
  account?: AccountDTO;
  error?: any;
};
