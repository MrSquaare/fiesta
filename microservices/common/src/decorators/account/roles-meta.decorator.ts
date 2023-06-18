import { AccountRole } from "@common/types";
import { SetMetadata } from "@nestjs/common";

export const RolesMeta = (...roles: AccountRole[]) => {
  return SetMetadata("roles", roles);
};
