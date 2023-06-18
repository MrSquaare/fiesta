import { AccountRole } from "@common/types";
import { RolesMeta } from "@microservices/common/dist/decorators/account";
import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { Follower } from "@microservices/types/dist/follower";
import { User } from "@microservices/types/dist/user";
import { UseGuards } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from "@nestjs/graphql";

import { AddFollowerInput } from "./dto/add-follower.input";
import { RemoveFollowerInput } from "./dto/remove-follower.input";
import { FollowersService } from "./followers.service";

@Resolver(() => Follower)
export class FollowersResolver {
  constructor(private readonly followersService: FollowersService) {}

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Follower)
  createFollower(
    @Args("createFollowerInput") createFollowerInput: AddFollowerInput
  ) {
    return this.followersService.create(createFollowerInput);
  }

  @Query(() => [Follower], { name: "followers" })
  findFollowers(@Args("id", { type: () => ID }) id: string) {
    return this.followersService.findFollowers(id);
  }

  @Query(() => [Follower], { name: "following" })
  findFollowing(@Args("id", { type: () => ID }) id: string) {
    return this.followersService.findFollowing(id);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Follower)
  removeFollower(
    @Args("removeFollowerInput") removeFollowerInput: RemoveFollowerInput
  ) {
    return this.followersService.remove(removeFollowerInput);
  }

  @ResolveField(() => User)
  user(@Parent() follower: Follower) {
    return { __typename: "User", id: follower.user_id };
  }

  @ResolveField(() => User)
  follower(@Parent() follower: Follower) {
    return { __typename: "User", id: follower.follower_id };
  }
}
