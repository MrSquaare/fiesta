import { BaseDTO } from "../base";

export enum AccountRole {
  ADMIN,
}

export type AccountDTO = BaseDTO & {
  email: string;
  password?: string;
  roles: AccountRole[];
};
