import { Timeline } from "@microservices/types/dist/timeline";
import { InputType, PickType } from "@nestjs/graphql";

@InputType()
export class CreateTimelineInput extends PickType(
  Timeline,
  ["post_ids"],
  InputType
) {}
