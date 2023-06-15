import { UserDTO } from "../../user";

export type UserCheckReqMessage = {
  id: string;
};

export type UserCheckResMessage = {
  valid: boolean;
  user?: UserDTO;
  error?: any;
};
