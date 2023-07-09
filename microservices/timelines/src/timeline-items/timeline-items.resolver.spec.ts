import { Test, TestingModule } from "@nestjs/testing";

import { TimelineItemsResolver } from "./timeline-items.resolver";
import { TimelineItemsService } from "./timeline-items.service";

describe("TimelineItemsResolver", () => {
  let resolver: TimelineItemsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelineItemsResolver, TimelineItemsService],
    }).compile();

    resolver = module.get<TimelineItemsResolver>(TimelineItemsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
