import { AccountDTO } from "@common/types";
import { TimelineBridgeService } from "@microservices/common/dist/modules/timeline-bridge";
import { User } from "@microservices/types/dist/user";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ValidationError,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { CreateMyUserInput } from "./dto/create-my-user.input";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly timelineBridgeService: TimelineBridgeService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput);

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }

  async findAllByIds(ids: string[]): Promise<User[]> {
    const users = await this.usersRepository.find({ where: { id: In(ids) } });

    return users;
  }

  async exists(id: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return !!user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findOneByAccountId(accountId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { account_id: accountId },
    });

    if (!user) {
      throw new NotFoundException(`User for account #${accountId} not found`);
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username #${username} not found`);
    }

    return user;
  }

  async update(updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.preload(updateUserInput);

    if (!user) {
      throw new NotFoundException(`User #${updateUserInput.id} not found`);
    }

    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    await this.usersRepository.remove(user);

    return user;
  }

  async createMyUser(
    createMyUserInput: CreateMyUserInput,
    account: AccountDTO,
  ): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { account_id: account.id },
        { username: createMyUserInput.username },
      ],
    });

    if (existingUser) {
      if (existingUser.account_id === account.id) {
        throw new BadRequestException("User already created for this account");
      }

      if (existingUser.username === createMyUserInput.username) {
        throw new BadRequestException([
          {
            property: "username",
            constraints: {
              taken: "Username already taken",
            },
          },
        ] as ValidationError[]);
      }
    }

    const user = this.usersRepository.create({
      ...createMyUserInput,
      account_id: account.id,
    });

    const timelines = await this.timelineBridgeService.initUser(user.id);

    user.timeline_id = timelines.timelineId;
    user.for_you_timeline_id = timelines.forYouTimelineId;
    user.following_timeline_id = timelines.followingTimelineId;

    return await this.usersRepository.save(user);
  }

  async updateMyUser(
    updateMyUserInput: UpdateUserInput,
    account: AccountDTO,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { account_id: account.id },
    });

    if (!user) {
      throw new NotFoundException("User not created for this account");
    }

    return this.usersRepository.save({
      ...user,
      ...updateMyUserInput,
    });
  }

  async findMyUser(account: AccountDTO): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { account_id: account.id },
    });

    if (!user) {
      throw new NotFoundException(`User #${account.id} not found`);
    }

    return user;
  }
}
