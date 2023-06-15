import { Field, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

import { AuthDTO } from "../dto/auth.dto";

@ObjectType()
export class Auth implements AuthDTO {
  @Field(() => String)
  @IsString()
  token: string;
}
