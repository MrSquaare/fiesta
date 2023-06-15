import { Account } from "@microservices/types/dist/account";
import { Field, InputType, PickType } from "@nestjs/graphql";

@InputType()
export class SignInInput extends PickType(Account, ["email"], InputType) {
  @Field(() => String)
  password: string;
}
