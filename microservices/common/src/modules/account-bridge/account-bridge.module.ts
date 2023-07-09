import { DynamicModule, Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ACCOUNT_BRIDGE_NAME } from "./account-bridge.constants";
import { AccountBridgeService } from "./account-bridge.service";

type AccountBridgeModuleOptions = {
  redisHost?: string;
  redisPort?: number;
};

@Global()
@Module({})
export class AccountBridgeModule {
  static forRoot(options?: AccountBridgeModuleOptions): DynamicModule {
    return {
      module: AccountBridgeModule,
      imports: [
        ClientsModule.register([
          {
            name: ACCOUNT_BRIDGE_NAME,
            transport: Transport.REDIS,
            options: {
              host: options.redisHost ?? "localhost",
              port: options.redisPort ?? 6379,
            },
          },
        ]),
      ],
      providers: [AccountBridgeService],
      exports: [AccountBridgeService],
    };
  }
}
