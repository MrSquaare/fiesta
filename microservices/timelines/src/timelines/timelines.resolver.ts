import { AccountRole } from "@common/types";
import { RolesMeta } from "@microservices/common/dist/decorators/account";
import { GqlFilter } from "@microservices/common/dist/filters";
import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { Timeline, TimelineItem } from "@microservices/types/dist/timeline";
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

import { CreateTimelineInput } from "./dto/create-timeline.input";
import { UpdateTimelineInput } from "./dto/update-timeline.input";
import { TimelinesService } from "./timelines.service";

@UseFilters(GqlFilter)
@Resolver(() => Timeline)
export class TimelinesResolver {
  constructor(private readonly timelinesService: TimelinesService) {}

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Timeline)
  createTimeline(
    @Args("createTimelineInput") createTimelineInput: CreateTimelineInput
  ) {
    return this.timelinesService.create(createTimelineInput);
  }

  @Query(() => [Timeline], { name: "timelines" })
  findAll() {
    return this.timelinesService.findAll();
  }

  @Query(() => Timeline, { name: "timeline" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.timelinesService.findOne(id);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Timeline)
  updateTimeline(
    @Args("updateTimelineInput") updateTimelineInput: UpdateTimelineInput
  ) {
    return this.timelinesService.update(updateTimelineInput);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Timeline)
  removeTimeline(@Args("id", { type: () => ID }) id: string) {
    return this.timelinesService.remove(id);
  }

  @ResolveField(() => TimelineItem)
  items(@Parent() timeline: Timeline) {
    return { __typename: "[TimelineItem]", ids: timeline.item_ids };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: "Timeline"; id: string }) {
    return this.timelinesService.findOne(reference.id);
  }
}
