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
    private readonly TimelinesRepository: Repository<Timeline>
  ) {}

  async create(createTimelineInput: CreateTimelineInput): Promise<Timeline> {
    const Timeline = this.TimelinesRepository.create(createTimelineInput);

    return await this.TimelinesRepository.save(Timeline);
  }

  async findAll(): Promise<Timeline[]> {
    const Timelines = await this.TimelinesRepository.find();

    return Timelines;
  }

  async exists(id: string): Promise<boolean> {
    const Timeline = await this.TimelinesRepository.findOne({
      where: { id },
    });

    return !!Timeline;
  }

  async findOne(id: string): Promise<Timeline> {
    const Timeline = await this.TimelinesRepository.findOne({
      where: { id },
    });

    if (!Timeline) {
      throw new NotFoundException(`Timeline #${id} not found`);
    }

    return Timeline;
  }

  async update(updateTimelineInput: UpdateTimelineInput) {
    const Timeline = await this.TimelinesRepository.preload(
      updateTimelineInput
    );

    if (!Timeline) {
      throw new NotFoundException(
        `Timeline #${updateTimelineInput.id} not found`
      );
    }

    return this.TimelinesRepository.save(Timeline);
  }

  async remove(id: string) {
    const Timeline = await this.TimelinesRepository.findOne({
      where: { id },
    });

    if (!Timeline) {
      throw new NotFoundException(`Timeline #${id} not found`);
    }

    await this.TimelinesRepository.remove(Timeline);

    return Timeline;
  }
}
