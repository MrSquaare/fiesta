import { InputType, Field, PartialType, ID } from "@nestjs/graphql";

import { CreateAccountInput } from "./create-account.input";

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field(() => ID)
  id: string;
}
