import { BaseDTO } from "../../base";
import { UserDTO } from "../../user";

export type PostDTO = BaseDTO & {
  id: string;
  content: string;
  author_id: string;
  author?: UserDTO;
};
