import { DynamicModule, Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AUTH_BRIDGE_NAME } from "./auth-bridge.constants";
import { AuthBridgeService } from "./auth-bridge.service";

type AuthBridgeModuleOptions = {
  redisHost?: string;
  redisPort?: number;
};

@Global()
@Module({})
export class AuthBridgeModule {
  static forRoot(options?: AuthBridgeModuleOptions): DynamicModule {
    return {
      module: AuthBridgeModule,
      imports: [
        ClientsModule.register([
          {
            name: AUTH_BRIDGE_NAME,
            transport: Transport.REDIS,
            options: {
              host: options.redisHost ?? "localhost",
              port: options.redisPort ?? 6379,
            },
          },
        ]),
      ],
      providers: [AuthBridgeService],
      exports: [AuthBridgeService],
    };
  }
}
