import { InputType, Field, PartialType, ID } from "@nestjs/graphql";

import { CreateTimelineInput } from "./create-timeline.input";

@InputType()
export class UpdateTimelineInput extends PartialType(CreateTimelineInput) {
  @Field(() => ID)
  id: string;
}
