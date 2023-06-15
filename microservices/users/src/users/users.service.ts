import { User } from "@microservices/types/dist/user";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput);

    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

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

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserInput,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
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
}
