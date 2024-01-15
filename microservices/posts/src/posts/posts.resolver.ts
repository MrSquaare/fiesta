import { AccountRole, UserDTO } from "@common/types";
import { RolesMeta } from "@microservices/common/dist/decorators/account";
import { CurrentUser } from "@microservices/common/dist/decorators/user";
import { GqlFilter } from "@microservices/common/dist/filters";
import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { AccountUserBridgeInterceptor } from "@microservices/common/dist/modules/user-bridge";
import { Post } from "@microservices/types/dist/post";
import { User } from "@microservices/types/dist/user";
import { UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
  ID,
  ResolveReference,
} from "@nestjs/graphql";

import { CreateMyPostInput } from "./dto/create-my-post.input";
import { CreatePostInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { PostsService } from "./posts.service";

@UseFilters(GqlFilter)
@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Post)
  createPost(@Args("createPostInput") createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: "posts" })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: "post" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.postsService.findOne(id);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Post)
  updatePost(@Args("updatePostInput") updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Post)
  removePost(@Args("id", { type: () => ID }) id: string) {
    return this.postsService.remove(id);
  }

  @UseGuards(AuthBridgeGuard)
  @UseInterceptors(AccountUserBridgeInterceptor)
  @Mutation(() => Post)
  createMyPost(
    @Args("createMyPostInput") createMyPostInput: CreateMyPostInput,
    @CurrentUser() user: UserDTO,
  ) {
    return this.postsService.createMyPost(createMyPostInput, user);
  }

  @UseGuards(AuthBridgeGuard)
  @UseInterceptors(AccountUserBridgeInterceptor)
  @Mutation(() => Post)
  removeMyPost(
    @Args("id", { type: () => ID }) id: string,
    @CurrentUser() user: UserDTO,
  ) {
    return this.postsService.removeMyPost(id, user);
  }

  @ResolveField(() => User)
  author(@Parent() post: Post) {
    return { __typename: "User", id: post.author_id };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: "Post"; id: string }) {
    return this.postsService.findOne(reference.id);
  }

  @ResolveReference()
  resolveReferences(reference: { __typename: "[Post]"; ids: string[] }) {
    return this.postsService.findAllByIds(reference.ids);
  }
}
