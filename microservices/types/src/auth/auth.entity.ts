import { AuthDTO } from "@common/types";
import { Field, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType()
export class Auth implements AuthDTO {
  @Field(() => String)
  @IsString()
  token: string;
}
