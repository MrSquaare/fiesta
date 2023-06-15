import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { USER_BRIDGE_NAME } from "./user-bridge.constants";
import { UserBridgeService } from "./user-bridge.service";

type UserBridgeModuleOptions = {
  redisHost?: string;
  redisPort?: number;
};

@Module({})
export class UserBridgeModule {
  static forRoot(options?: UserBridgeModuleOptions): DynamicModule {
    return {
      module: UserBridgeModule,
      imports: [
        ClientsModule.register([
          {
            name: USER_BRIDGE_NAME,
            transport: Transport.REDIS,
            options: {
              host: options.redisHost ?? "localhost",
              port: options.redisPort ?? 6379,
            },
          },
        ]),
      ],
      providers: [UserBridgeService],
      exports: [UserBridgeService],
    };
  }
}
