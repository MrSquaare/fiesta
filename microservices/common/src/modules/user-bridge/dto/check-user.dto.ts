import { UserDTO } from "@common/types";

export type CheckUserReqMessage = {
  id: string;
};

export type CheckUserResMessage = {
  user?: UserDTO;
  error?: any;
};
