import {
  CheckUserReqMessage,
  CheckUserResMessage,
  GetAccountUserReqMessage,
  GetAccountUserResMessage,
  USER_BRIDGE_CHECK_USER,
  USER_BRIDGE_GET_ACCOUNT_USER,
} from "@microservices/common/dist/modules/user-bridge";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_BRIDGE_CHECK_USER)
  async checkUser(
    @Payload() payload: CheckUserReqMessage,
  ): Promise<CheckUserResMessage> {
    try {
      const user = await this.usersService.findOne(payload.id);

      return {
        user,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  @MessagePattern(USER_BRIDGE_GET_ACCOUNT_USER)
  async getAccountUser(
    @Payload() payload: GetAccountUserReqMessage,
  ): Promise<GetAccountUserResMessage> {
    try {
      const user = await this.usersService.findOneByAccountId(
        payload.accountId,
      );

      return {
        user,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
