import { UserDTO } from "@common/types";

export type MinimalUser = Partial<UserDTO> &
  Pick<
    UserDTO,
    | "id"
    | "username"
    | "display_name"
    | "biography"
    | "followers_count"
    | "following_count"
  >;
