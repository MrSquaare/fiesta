import { Query, Resolver } from "@nestjs/graphql";

import { HelloWorldService } from "./hello-world.service";

@Resolver()
export class HelloWorldResolver {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Query(() => String)
  helloWorld() {
    return this.helloWorldService.helloWorld();
  }
}
