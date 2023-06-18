import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { Post } from "@microservices/types/dist/post";
import { User } from "@microservices/types/dist/user";
import { UseGuards } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
  ID,
} from "@nestjs/graphql";

import { CreatePostInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { PostsService } from "./posts.service";

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Post)
  createPost(@Args("createPostInput") createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => [Post], { name: "posts" })
  findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => Post, { name: "post" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Post)
  updatePost(@Args("updatePostInput") updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Post)
  removePost(@Args("id", { type: () => ID }) id: string) {
    return this.postsService.remove(id);
  }

  @ResolveField(() => User)
  author(@Parent() post: Post) {
    return { __typename: "User", id: post.author_id };
  }
}
