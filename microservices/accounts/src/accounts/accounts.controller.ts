import {
  ACCOUNT_BRIDGE_CHECK_ACCOUNT,
  ACCOUNT_BRIDGE_CREATE_BY_CREDENTIALS,
  ACCOUNT_BRIDGE_GET_BY_CREDENTIALS,
  CheckAccountReqMessage,
  CheckAccountResMessage,
  CreateByCredentialsReqMessage,
  CreateByCredentialsResMessage,
  GetByCredentialsReqMessage,
  GetByCredentialsResMessage,
} from "@microservices/common/dist/modules/account-bridge";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AccountsService } from "./accounts.service";

@Controller("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @MessagePattern(ACCOUNT_BRIDGE_CHECK_ACCOUNT)
  async checkAccount(
    @Payload() payload: CheckAccountReqMessage
  ): Promise<CheckAccountResMessage> {
    try {
      const account = await this.accountsService.findOne(payload.id);

      return {
        account,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  @MessagePattern(ACCOUNT_BRIDGE_CREATE_BY_CREDENTIALS)
  async createByCredentials(
    @Payload() payload: CreateByCredentialsReqMessage
  ): Promise<CreateByCredentialsResMessage> {
    try {
      const account = await this.accountsService.createByCredentials(
        payload.email,
        payload.password
      );

      return {
        account,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  @MessagePattern(ACCOUNT_BRIDGE_GET_BY_CREDENTIALS)
  async getByCredentials(
    @Payload() payload: GetByCredentialsReqMessage
  ): Promise<GetByCredentialsResMessage> {
    try {
      const account = await this.accountsService.getByCredentials(
        payload.email,
        payload.password
      );

      return {
        account,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
