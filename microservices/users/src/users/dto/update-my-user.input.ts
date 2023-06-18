import { InputType, Field, PartialType, ID } from "@nestjs/graphql";

import { CreateMyUserInput } from "./create-my-user.input";

@InputType()
export class UpdateMyUserInput extends PartialType(CreateMyUserInput) {
  @Field(() => ID)
  id: string;
}
