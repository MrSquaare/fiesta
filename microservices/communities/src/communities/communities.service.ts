import { Community } from "@microservices/types/dist/community";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCommunityInput } from "./dto/create-community.input";
import { UpdateCommunityInput } from "./dto/update-community.input";

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private readonly CommunitiesRepository: Repository<Community>
  ) {}

  async create(createCommunityInput: CreateCommunityInput): Promise<Community> {
    const Community = this.CommunitiesRepository.create(createCommunityInput);

    return await this.CommunitiesRepository.save(Community);
  }

  async findAll(): Promise<Community[]> {
    const Communities = await this.CommunitiesRepository.find();

    return Communities;
  }

  async exists(id: string): Promise<boolean> {
    const Community = await this.CommunitiesRepository.findOne({
      where: { id },
    });

    return !!Community;
  }

  async findOne(id: string): Promise<Community> {
    const Community = await this.CommunitiesRepository.findOne({
      where: { id },
    });

    if (!Community) {
      throw new NotFoundException(`Community #${id} not found`);
    }

    return Community;
  }

  async update(updateCommunityInput: UpdateCommunityInput) {
    const Community = await this.CommunitiesRepository.preload(
      updateCommunityInput
    );

    if (!Community) {
      throw new NotFoundException(
        `Community #${updateCommunityInput.id} not found`
      );
    }

    return this.CommunitiesRepository.save(Community);
  }

  async remove(id: string) {
    const Community = await this.CommunitiesRepository.findOne({
      where: { id },
    });

    if (!Community) {
      throw new NotFoundException(`Community #${id} not found`);
    }

    await this.CommunitiesRepository.remove(Community);

    return Community;
  }
}
