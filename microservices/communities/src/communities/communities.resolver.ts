import { Community } from "@microservices/types/dist/community";
import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { CommunitiesService } from "./communities.service";
import { CreateCommunityInput } from "./dto/create-community.input";
import { UpdateCommunityInput } from "./dto/update-community.input";

// TODO: Complete this resolver

@Resolver(() => Community)
export class CommunitiesResolver {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Mutation(() => Community)
  createCommunity(
    @Args("createCommunityInput") createCommunityInput: CreateCommunityInput
  ) {
    return this.communitiesService.create(createCommunityInput);
  }

  @Query(() => [Community], { name: "communities" })
  findAll() {
    return this.communitiesService.findAll();
  }

  @Query(() => Community, { name: "community" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.communitiesService.findOne(id);
  }

  @Mutation(() => Community)
  updateCommunity(
    @Args("updateCommunityInput") updateCommunityInput: UpdateCommunityInput
  ) {
    return this.communitiesService.update(
      updateCommunityInput.id,
      updateCommunityInput
    );
  }

  @Mutation(() => Community)
  removeCommunity(@Args("id", { type: () => Int }) id: number) {
    return this.communitiesService.remove(id);
  }
}
