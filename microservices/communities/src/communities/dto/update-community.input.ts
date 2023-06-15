import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

import { CreateCommunityInput } from "./create-community.input";

@InputType()
export class UpdateCommunityInput extends PartialType(CreateCommunityInput) {
  @Field(() => Int)
  id: number;
}
