import { InputType, Field, PartialType, ID } from "@nestjs/graphql";

import { CreateTimelineItemInput } from "./create-timeline-item.input";

@InputType()
export class UpdateTimelineItemInput extends PartialType(
  CreateTimelineItemInput
) {
  @Field(() => ID)
  id: string;
}
