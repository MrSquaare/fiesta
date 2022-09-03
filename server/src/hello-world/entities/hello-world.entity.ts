import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class HelloWorld {
  @Field(() => String, { description: "Hello World message" })
  message: string;
}
