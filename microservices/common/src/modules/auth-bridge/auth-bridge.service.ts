import { AccountRole } from "@common/types";
import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";

import {
  AUTH_BRIDGE_NAME,
  AUTH_BRIDGE_CHECK_AUTH,
} from "./auth-bridge.constants";
import { CheckAuthReqMessage, CheckAuthResMessage } from "./dto";

@Injectable()
export class AuthBridgeService {
  constructor(
    @Inject(AUTH_BRIDGE_NAME)
    private readonly authClient: ClientProxy
  ) {}

  async checkAuth(token: string, roles?: AccountRole[]) {
    const reqMsg: CheckAuthReqMessage = { token, roles };
    const resMsg: CheckAuthResMessage = await firstValueFrom(
      this.authClient.send(AUTH_BRIDGE_CHECK_AUTH, reqMsg).pipe(timeout(5000))
    );

    if (resMsg.error) {
      throw resMsg.error;
    }

    if (!resMsg.account) {
      throw new ForbiddenException("Unauthorized");
    }

    return resMsg.account;
  }
}
