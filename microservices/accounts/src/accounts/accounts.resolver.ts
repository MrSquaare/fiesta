import { AccountRole } from "@common/types";
import { RolesMeta } from "@microservices/common/dist/decorators/account";
import { GqlFilter } from "@microservices/common/dist/filters";
import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { Account } from "@microservices/types/dist/account";
import { UseFilters, UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";

import { AccountsService } from "./accounts.service";
import { CreateAccountInput } from "./dto/create-account.input";
import { UpdateAccountInput } from "./dto/update-account.input";

@UseFilters(GqlFilter)
@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Account)
  createAccount(
    @Args("createAccountInput") createAccountInput: CreateAccountInput,
  ) {
    return this.accountsService.create(createAccountInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => [Account], { name: "accounts" })
  findAll() {
    return this.accountsService.findAll();
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Query(() => Account, { name: "account" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.accountsService.findOne(id);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Account)
  updateAccount(
    @Args("updateAccountInput") updateAccountInput: UpdateAccountInput,
  ) {
    return this.accountsService.update(updateAccountInput);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => Account)
  removeAccount(@Args("id", { type: () => ID }) id: string) {
    return this.accountsService.remove(id);
  }
}
