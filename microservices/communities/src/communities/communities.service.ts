import { Injectable } from "@nestjs/common";

import { CreateCommunityInput } from "./dto/create-community.input";
import { UpdateCommunityInput } from "./dto/update-community.input";

// TODO: Complete this service

@Injectable()
export class CommunitiesService {
  create(createCommunityInput: CreateCommunityInput) {
    return "This action adds a new community";
  }

  findAll() {
    return `This action returns all communities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityInput: UpdateCommunityInput) {
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}