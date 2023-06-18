import { UserDTO } from "@common/types";

export type UserCheckReqMessage = {
  id: string;
};

export type UserCheckResMessage = {
  valid: boolean;
  user?: UserDTO;
  error?: any;
};
