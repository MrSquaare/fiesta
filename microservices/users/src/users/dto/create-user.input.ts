import { User } from "@microservices/types/dist/user";
import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from "@nestjs/graphql";

@InputType()
export class CreateUserInput extends IntersectionType(
  PickType(User, [
    "account_id",
    "username",
    "display_name",
    "timeline_id",
    "for_you_timeline_id",
    "following_timeline_id",
  ]),
  PartialType(PickType(User, ["biography"])),
  InputType,
) {}
