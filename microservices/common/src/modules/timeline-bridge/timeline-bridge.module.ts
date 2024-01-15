import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { TIMELINE_BRIDGE_NAME } from "./timeline-bridge.constants";
import { TimelineBridgeService } from "./timeline-bridge.service";

type TimelineBridgeModuleOptions = {
  redisHost?: string;
  redisPort?: number;
};

@Module({})
export class TimelineBridgeModule {
  static forRoot(options?: TimelineBridgeModuleOptions): DynamicModule {
    return {
      module: TimelineBridgeModule,
      imports: [
        ClientsModule.register([
          {
            name: TIMELINE_BRIDGE_NAME,
            transport: Transport.REDIS,
            options: {
              host: options.redisHost ?? "localhost",
              port: options.redisPort ?? 6379,
            },
          },
        ]),
      ],
      providers: [TimelineBridgeService],
      exports: [TimelineBridgeService],
    };
  }
}
