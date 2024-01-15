import { Follower } from "@microservices/types/dist/follower";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UsersService } from "../users/users.service";

import { AddFollowerInput } from "./dto/add-follower.input";
import { RemoveFollowerInput } from "./dto/remove-follower.input";

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followersRepository: Repository<Follower>,
    private readonly usersService: UsersService,
  ) {}

  async create(createFollowerInput: AddFollowerInput) {
    const userExists = this.usersService.exists(createFollowerInput.user_id);

    if (!userExists) {
      throw new BadRequestException(
        `User #${createFollowerInput.user_id} not found`,
      );
    }

    const followerExists = this.usersService.exists(
      createFollowerInput.follower_id,
    );

    if (!followerExists) {
      throw new BadRequestException(
        `User #${createFollowerInput.follower_id} not found`,
      );
    }

    const follower = this.followersRepository.create(createFollowerInput);

    return await this.followersRepository.save(follower);
  }

  async findFollowers(id: string) {
    const followers = await this.followersRepository.find({
      where: { user_id: id },
    });

    return followers;
  }

  async findFollowing(id: string) {
    const following = await this.followersRepository.find({
      where: { follower_id: id },
    });

    return following;
  }

  async remove(removeFollowerInput: RemoveFollowerInput) {
    const follower = await this.followersRepository.findOne({
      where: removeFollowerInput,
    });

    if (!follower) {
      throw new Error("Follower not found");
    }

    await this.followersRepository.remove(follower);

    return follower;
  }
}
