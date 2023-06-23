import { BaseDTO } from "../base";

import { TimelineItemDTO } from "./timeline-item.dto";

export type TimelineDTO = BaseDTO & {
  item_ids: string[];
  items?: TimelineItemDTO[];
};
