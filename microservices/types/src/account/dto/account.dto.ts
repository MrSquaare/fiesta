import { BaseDTO } from "../../base";

export type AccountDTO = BaseDTO & {
  email: string;
  password: string;
  roles: number[];
};
