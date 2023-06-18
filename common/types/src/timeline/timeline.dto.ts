import { BaseDTO } from "../base";
import { PostDTO } from "../post";

export type TimelineDTO = BaseDTO & {
  post_ids: string[];
  posts?: PostDTO[];
};
