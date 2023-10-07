import { TimelineItem } from "@microservices/types/dist/timeline";
import { InputType, PickType } from "@nestjs/graphql";

@InputType()
export class CreateTimelineItemInput extends PickType(
  TimelineItem,
  ["timeline_id", "post_id", "user_id", "type"],
  InputType,
) {}
