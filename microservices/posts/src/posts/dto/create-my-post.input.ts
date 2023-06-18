import { Post } from "@microservices/types/dist/post";
import { InputType, PickType } from "@nestjs/graphql";

@InputType()
export class CreateMyPostInput extends PickType(Post, ["content"], InputType) {}
