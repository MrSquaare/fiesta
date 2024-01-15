import { Test, TestingModule } from "@nestjs/testing";

import { FollowersResolver } from "./followers.resolver";
import { FollowersService } from "./followers.service";

describe("FollowersResolver", () => {
  let resolver: FollowersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowersResolver, FollowersService],
    }).compile();

    resolver = module.get<FollowersResolver>(FollowersResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
