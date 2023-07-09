import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";

import { mapErrorToException } from "../../helpers/error";

import {
  ACCOUNT_BRIDGE_NAME,
  ACCOUNT_BRIDGE_CHECK_ACCOUNT,
  ACCOUNT_BRIDGE_CREATE_BY_CREDENTIALS,
  ACCOUNT_BRIDGE_GET_BY_CREDENTIALS,
} from "./account-bridge.constants";
import {
  CreateByCredentialsReqMessage,
  CreateByCredentialsResMessage,
  GetByCredentialsReqMessage,
  GetByCredentialsResMessage,
} from "./dto";
import {
  CheckAccountReqMessage,
  CheckAccountResMessage,
} from "./dto/check-account.dto";

@Injectable()
export class AccountBridgeService {
  constructor(
    @Inject(ACCOUNT_BRIDGE_NAME)
    private readonly accountsClient: ClientProxy
  ) {}

  async checkAccount(id: string) {
    const reqMsg: CheckAccountReqMessage = { id };
    const resMsg: CheckAccountResMessage = await firstValueFrom(
      this.accountsClient
        .send(ACCOUNT_BRIDGE_CHECK_ACCOUNT, reqMsg)
        .pipe(timeout(5000))
    );

    if ("error" in resMsg) {
      throw mapErrorToException(resMsg.error);
    }

    return resMsg.account;
  }

  async createByCredentials(email: string, password: string) {
    const reqMsg: CreateByCredentialsReqMessage = { email, password };
    const resMsg: CreateByCredentialsResMessage = await firstValueFrom(
      this.accountsClient
        .send(ACCOUNT_BRIDGE_CREATE_BY_CREDENTIALS, reqMsg)
        .pipe(timeout(5000))
    );

    if ("error" in resMsg) {
      throw mapErrorToException(resMsg.error);
    }

    return resMsg.account;
  }

  async getByCredentials(email: string, password: string) {
    const reqMsg: GetByCredentialsReqMessage = { email, password };
    const resMsg: GetByCredentialsResMessage = await firstValueFrom(
      this.accountsClient
        .send(ACCOUNT_BRIDGE_GET_BY_CREDENTIALS, reqMsg)
        .pipe(timeout(5000))
    );

    if ("error" in resMsg) {
      throw mapErrorToException(resMsg.error);
    }

    return resMsg.account;
  }
}
