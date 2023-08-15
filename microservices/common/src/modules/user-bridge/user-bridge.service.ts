import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";

import { getErrorException } from "../../helpers/error";

import {
  CheckUserReqMessage,
  CheckUserResMessage,
  GetAccountUserReqMessage,
  GetAccountUserResMessage,
} from "./dto";
import {
  USER_BRIDGE_CHECK_USER,
  USER_BRIDGE_NAME,
} from "./user-bridge.constants";

@Injectable()
export class UserBridgeService {
  constructor(
    @Inject(USER_BRIDGE_NAME)
    private readonly usersClient: ClientProxy
  ) {}

  async checkUser(id: string) {
    const reqMsg: CheckUserReqMessage = { id };
    const resMsg: CheckUserResMessage = await firstValueFrom(
      this.usersClient.send(USER_BRIDGE_CHECK_USER, reqMsg).pipe(timeout(5000))
    );

    if ("error" in resMsg) {
      throw getErrorException(resMsg.error);
    }

    return resMsg.user;
  }

  async getAccountUser(accountId: string) {
    const reqMsg: GetAccountUserReqMessage = { accountId };
    const resMsg: GetAccountUserResMessage = await firstValueFrom(
      this.usersClient.send(USER_BRIDGE_CHECK_USER, reqMsg).pipe(timeout(5000))
    );

    if ("error" in resMsg) {
      throw getErrorException(resMsg.error);
    }

    return resMsg.user;
  }
}
