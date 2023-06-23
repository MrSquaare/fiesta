import { Timeline } from "@microservices/types/dist/timeline";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateTimelineInput } from "./dto/create-timeline.input";
import { UpdateTimelineInput } from "./dto/update-timeline.input";

@Injectable()
export class TimelinesService {
  constructor(
    @InjectRepository(Timeline)
    private readonly timelinesRepository: Repository<Timeline>
  ) {}

  async create(createTimelineInput: CreateTimelineInput): Promise<Timeline> {
    const timeline = this.timelinesRepository.create(createTimelineInput);

    return await this.timelinesRepository.save(timeline);
  }

  async findAll(): Promise<Timeline[]> {
    const timelines = await this.timelinesRepository.find();

    return timelines;
  }

  async exists(id: string): Promise<boolean> {
    const timeline = await this.timelinesRepository.findOne({
      where: { id },
    });

    return !!timeline;
  }

  async findOne(id: string): Promise<Timeline> {
    const timeline = await this.timelinesRepository.findOne({
      where: { id },
    });

    if (!timeline) {
      throw new NotFoundException(`Timeline #${id} not found`);
    }

    return timeline;
  }

  async update(updateTimelineInput: UpdateTimelineInput) {
    const timeline = await this.timelinesRepository.preload(
      updateTimelineInput
    );

    if (!timeline) {
      throw new NotFoundException(
        `Timeline #${updateTimelineInput.id} not found`
      );
    }

    return this.timelinesRepository.save(timeline);
  }

  async remove(id: string) {
    const timeline = await this.timelinesRepository.findOne({
      where: { id },
    });

    if (!timeline) {
      throw new NotFoundException(`Timeline #${id} not found`);
    }

    await this.timelinesRepository.remove(timeline);

    return timeline;
  }
}
