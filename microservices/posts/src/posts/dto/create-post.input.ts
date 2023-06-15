import { Post } from "@microservices/types/dist/post";
import { InputType, PickType } from "@nestjs/graphql";

@InputType()
export class CreatePostInput extends PickType(
  Post,
  ["content", "author_id"],
  InputType
) {}
