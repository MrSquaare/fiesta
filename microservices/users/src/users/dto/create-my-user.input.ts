import { User } from "@microservices/types/dist/user";
import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from "@nestjs/graphql";

@InputType()
export class CreateMyUserInput extends IntersectionType(
  PickType(User, ["username", "display_name"]),
  PartialType(PickType(User, ["biography"])),
  InputType,
) {}
