import { Community } from "@microservices/types/dist/community";
import { InputType, PickType } from "@nestjs/graphql";

@InputType()
export class CreateCommunityInput extends PickType(
  Community,
  [
    "name",
    "description",
    "creator_id",
    "timeline_id",
    "is_official",
    "is_verified",
  ],
  InputType
) {}
