import { Follower } from "@microservices/types/dist/follower";
import { InputType, PickType } from "@nestjs/graphql";

@InputType()
export class AddFollowerInput extends PickType(
  Follower,
  ["user_id", "follower_id"],
  InputType
) {}
