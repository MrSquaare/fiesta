import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { Community } from "@microservices/types/dist/community";
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";

import { CommunitiesService } from "./communities.service";
import { CreateCommunityInput } from "./dto/create-community.input";
import { UpdateCommunityInput } from "./dto/update-community.input";

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Community)
  createCommunity(
    @Args("createCommunityInput") createCommunityInput: CreateCommunityInput
  ) {
    return this.communitiesService.create(createCommunityInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => [Community], { name: "communities" })
  findAll() {
    return this.communitiesService.findAll();
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => Community, { name: "community" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.communitiesService.findOne(id);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Community)
  updateCommunity(
    @Args("updateCommunityInput") updateCommunityInput: UpdateCommunityInput
  ) {
    return this.communitiesService.update(updateCommunityInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Community)
  removeCommunity(@Args("id", { type: () => ID }) id: string) {
    return this.communitiesService.remove(id);
  }
}
