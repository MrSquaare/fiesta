import { AccountRole } from "@common/types";
import { RolesMeta } from "@microservices/common/dist/decorators/account";
import { GqlFilter } from "@microservices/common/dist/filters";
import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { Post } from "@microservices/types/dist/post";
import { TimelineItem } from "@microservices/types/dist/timeline";
import { UseFilters, UseGuards } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  ResolveReference,
} from "@nestjs/graphql";

import { CreateTimelineItemInput } from "./dto/create-timeline-item.input";
import { UpdateTimelineItemInput } from "./dto/update-timeline-item.input";
import { TimelineItemsService } from "./timeline-items.service";

@UseFilters(GqlFilter)
@Resolver(() => TimelineItem)
export class TimelineItemsResolver {
  constructor(private readonly timelineitemsService: TimelineItemsService) {}

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => TimelineItem)
  createTimelineItem(
    @Args("createTimelineItemInput")
    createTimelineItemInput: CreateTimelineItemInput
  ) {
    return this.timelineitemsService.create(createTimelineItemInput);
  }

  @Query(() => [TimelineItem], { name: "timelineitems" })
  findAll() {
    return this.timelineitemsService.findAll();
  }

  @Query(() => TimelineItem, { name: "timelineitem" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.timelineitemsService.findOne(id);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => TimelineItem)
  updateTimelineItem(
    @Args("updateTimelineItemInput")
    updateTimelineItemInput: UpdateTimelineItemInput
  ) {
    return this.timelineitemsService.update(updateTimelineItemInput);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => TimelineItem)
  removeTimelineItem(@Args("id", { type: () => ID }) id: string) {
    return this.timelineitemsService.remove(id);
  }

  @ResolveField(() => Post)
  post(@Parent() timelineItem: TimelineItem) {
    return { __typename: "Post", id: timelineItem.post_id };
  }

  @ResolveField(() => Post)
  user(@Parent() timelineItem: TimelineItem) {
    return { __typename: "User", id: timelineItem.user_id };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: "TimelineItem"; id: string }) {
    return this.timelineitemsService.findOne(reference.id);
  }

  @ResolveReference()
  resolveReferences(reference: {
    __typename: "[TimelineItem]";
    ids: string[];
  }) {
    return this.timelineitemsService.findAllByIds(reference.ids);
  }
}
