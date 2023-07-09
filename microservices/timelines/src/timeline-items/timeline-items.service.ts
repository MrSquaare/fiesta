import { TimelineItem } from "@microservices/types/dist/timeline";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { TimelinesService } from "../timelines/timelines.service";

import { CreateTimelineItemInput } from "./dto/create-timeline-item.input";
import { UpdateTimelineItemInput } from "./dto/update-timeline-item.input";

@Injectable()
export class TimelineItemsService {
  constructor(
    @InjectRepository(TimelineItem)
    private readonly timelineItemsRepository: Repository<TimelineItem>,
    private readonly timelinesService: TimelinesService
  ) {}

  async create(
    createTimelineItemInput: CreateTimelineItemInput
  ): Promise<TimelineItem> {
    const timelineExists = await this.timelinesService.exists(
      createTimelineItemInput.timeline_id
    );

    if (!timelineExists) {
      throw new BadRequestException(
        `Timeline #${createTimelineItemInput.timeline_id} not found`
      );
    }

    const timelineItem = this.timelineItemsRepository.create(
      createTimelineItemInput
    );

    return await this.timelineItemsRepository.save(timelineItem);
  }

  async findAll(): Promise<TimelineItem[]> {
    const timelineItems = await this.timelineItemsRepository.find();

    return timelineItems;
  }

  async findAllByIds(ids: string[]): Promise<TimelineItem[]> {
    const timelineItems = await this.timelineItemsRepository.find({
      where: { id: In(ids) },
    });

    return timelineItems;
  }

  async exists(id: string): Promise<boolean> {
    const timelineItem = await this.timelineItemsRepository.findOne({
      where: { id },
    });

    return !!timelineItem;
  }

  async findOne(id: string): Promise<TimelineItem> {
    const timelineItem = await this.timelineItemsRepository.findOne({
      where: { id },
    });

    if (!timelineItem) {
      throw new NotFoundException(`TimelineItem #${id} not found`);
    }

    return timelineItem;
  }

  async update(updateTimelineItemInput: UpdateTimelineItemInput) {
    if (updateTimelineItemInput.timeline_id) {
      const timelineExists = await this.timelinesService.exists(
        updateTimelineItemInput.timeline_id
      );

      if (!timelineExists) {
        throw new BadRequestException(
          `Timeline #${updateTimelineItemInput.timeline_id} not found`
        );
      }
    }

    const timelineItem = await this.timelineItemsRepository.preload(
      updateTimelineItemInput
    );

    if (!timelineItem) {
      throw new NotFoundException(
        `TimelineItem #${updateTimelineItemInput.id} not found`
      );
    }

    return this.timelineItemsRepository.save(timelineItem);
  }

  async remove(id: string) {
    const timelineItem = await this.timelineItemsRepository.findOne({
      where: { id },
    });

    if (!timelineItem) {
      throw new NotFoundException(`TimelineItem #${id} not found`);
    }

    await this.timelineItemsRepository.remove(timelineItem);

    return timelineItem;
  }
}
