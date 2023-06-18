import { Account } from "@microservices/types/dist/account";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateAccountInput } from "./dto/create-account.input";
import { UpdateAccountInput } from "./dto/update-account.input";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {}

  async create(createAccountInput: CreateAccountInput): Promise<Account> {
    const account = this.accountsRepository.create(createAccountInput);

    return await this.accountsRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    const accounts = await this.accountsRepository.find();

    return accounts;
  }

  async exists(id: string): Promise<boolean> {
    const account = await this.accountsRepository.findOne({ where: { id } });

    return !!account;
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountsRepository.findOne({ where: { id } });

    if (!account) {
      throw new NotFoundException(`Account #${id} not found`);
    }

    return account;
  }

  async update(updateAccountInput: UpdateAccountInput) {
    const account = await this.accountsRepository.preload(updateAccountInput);

    if (!account) {
      throw new NotFoundException(
        `Account #${updateAccountInput.id} not found`
      );
    }

    return this.accountsRepository.save(account);
  }

  async remove(id: string) {
    const account = await this.accountsRepository.findOne({ where: { id } });

    if (!account) {
      throw new NotFoundException(`Account #${id} not found`);
    }

    await this.accountsRepository.remove(account);

    return account;
  }
}
