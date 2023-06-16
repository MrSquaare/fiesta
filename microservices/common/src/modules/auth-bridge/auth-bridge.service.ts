import { AuthCheckReqMessage, AuthCheckResMessage } from "@microservices/types/dist/auth-bridge";
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";

import { AUTH_BRIDGE_NAME, AUTH_BRIDGE_CHECK } from "./auth-bridge.constants";

@Injectable()
export class AuthBridgeService {
  constructor(
    @Inject(AUTH_BRIDGE_NAME)
    private readonly authClient: ClientProxy
  ) {}

  async checkAuth(token: string) {
    const reqMsg: AuthCheckReqMessage = { token };
    const resMsg: AuthCheckResMessage = await firstValueFrom(
      this.authClient.send(AUTH_BRIDGE_CHECK, reqMsg).pipe(timeout(5000))
    );

    if (resMsg.error) {
      throw resMsg.error;
    }

    if (!resMsg.valid) {
      throw new ForbiddenException(`Unauthorized`);
    }

    return resMsg.account;
  }
}
