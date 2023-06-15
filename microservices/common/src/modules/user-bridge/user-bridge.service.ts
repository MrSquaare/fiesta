import { UserCheckReqMessage, UserCheckResMessage } from "@microservices/types/dist";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";

import { USER_BRIDGE_CHECK, USER_BRIDGE_NAME } from "./user-bridge.constants";

@Injectable()
export class UserBridgeService {
  constructor(
    @Inject(USER_BRIDGE_NAME)
    private readonly usersClient: ClientProxy
  ) {}

  async checkUser(id: string) {
    const reqMsg: UserCheckReqMessage = { id };
    const resMsg: UserCheckResMessage = await firstValueFrom(
      this.usersClient.send(USER_BRIDGE_CHECK, reqMsg).pipe(timeout(5000))
    );

    if (resMsg.error) {
      throw resMsg.error;
    }

    if (!resMsg.valid) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return resMsg.user;
  }
}
