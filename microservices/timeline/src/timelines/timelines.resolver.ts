import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { Timeline } from "@microservices/types/dist/timeline";
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";

import { CreateTimelineInput } from "./dto/create-timeline.input";
import { UpdateTimelineInput } from "./dto/update-timeline.input";
import { TimelinesService } from "./timelines.service";

@Resolver(() => Timeline)
export class TimelinesResolver {
  constructor(private readonly timelinesService: TimelinesService) {}

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Timeline)
  createTimeline(
    @Args("createTimelineInput") createTimelineInput: CreateTimelineInput
  ) {
    return this.timelinesService.create(createTimelineInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => [Timeline], { name: "timelines" })
  findAll() {
    return this.timelinesService.findAll();
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => Timeline, { name: "timeline" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.timelinesService.findOne(id);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Timeline)
  updateTimeline(
    @Args("updateTimelineInput") updateTimelineInput: UpdateTimelineInput
  ) {
    return this.timelinesService.update(updateTimelineInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Timeline)
  removeTimeline(@Args("id", { type: () => ID }) id: string) {
    return this.timelinesService.remove(id);
  }
}
