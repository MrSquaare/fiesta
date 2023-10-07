import { Account } from "@microservices/types/dist/account";
import { InputType, PickType } from "@nestjs/graphql";

@InputType()
export class CreateAccountInput extends PickType(
  Account,
  ["email", "password"],
  InputType,
) {}
