import { InputType, Field, PartialType, ID } from "@nestjs/graphql";

import { CreateCommunityInput } from "./create-community.input";

@InputType()
export class UpdateCommunityInput extends PartialType(CreateCommunityInput) {
  @Field(() => ID)
  id: string;
}
