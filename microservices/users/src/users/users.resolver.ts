import { AccountDTO, AccountRole } from "@common/types";
import {
  RolesMeta,
  CurrentAccount,
} from "@microservices/common/dist/decorators/account";
import { GqlFilter } from "@microservices/common/dist/filters";
import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { Timeline } from "@microservices/types/dist/timeline";
import { User } from "@microservices/types/dist/user";
import { UseFilters, UseGuards } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveReference,
  ResolveField,
  Parent,
} from "@nestjs/graphql";

import { CreateMyUserInput } from "./dto/create-my-user.input";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateMyUserInput } from "./dto/update-my-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UsersService } from "./users.service";

@UseFilters(GqlFilter)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: "users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: "userByUsername" })
  findOneByUsername(@Args("username") username: string) {
    return this.usersService.findOneByUsername(username);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput);
  }

  @RolesMeta(AccountRole.ADMIN)
  @UseGuards(AuthBridgeGuard)
  @Mutation(() => User)
  removeUser(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => User)
  createMyUser(
    @Args("createMyUserInput") createMyUserInput: CreateMyUserInput,
    @CurrentAccount() account: AccountDTO,
  ) {
    return this.usersService.createMyUser(createMyUserInput, account);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => User)
  updateMyUser(
    @Args("updateMyUserInput") updateMyUserInput: UpdateMyUserInput,
    @CurrentAccount() account: AccountDTO,
  ) {
    return this.usersService.updateMyUser(updateMyUserInput, account);
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => User, { name: "myUser" })
  findMyUser(@CurrentAccount() account: AccountDTO) {
    return this.usersService.findMyUser(account);
  }

  @ResolveField(() => Timeline)
  for_you_timeline(@Parent() user: User) {
    return { __typename: "Timeline", id: user.for_you_timeline_id };
  }

  @ResolveField(() => Timeline)
  following_timeline(@Parent() user: User) {
    return { __typename: "Timeline", id: user.following_timeline_id };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: "User"; id: string }) {
    return this.usersService.findOne(reference.id);
  }

  @ResolveReference()
  resolveReferences(reference: { __typename: "[User]"; ids: string[] }) {
    return this.usersService.findAllByIds(reference.ids);
  }
}