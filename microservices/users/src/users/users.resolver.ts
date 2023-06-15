import { AuthBridgeGuard } from "@microservices/common/dist/modules/auth-bridge";
import { User } from "@microservices/types/dist/user";
import { UseGuards } from "@nestjs/common";
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveReference,
} from "@nestjs/graphql";

import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => [User], { name: "users" })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthBridgeGuard)
  @Query(() => User, { name: "user" })
  findOne(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(AuthBridgeGuard)
  @Mutation(() => User)
  removeUser(@Args("id", { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthBridgeGuard)
  @ResolveReference()
  resolveReference(reference: { __typename: "User"; id: string }) {
    return this.usersService.findOne(reference.id);
  }
}
