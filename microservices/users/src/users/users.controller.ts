import { USER_BRIDGE_CHECK } from "@microservices/common/dist/modules/user-bridge";
import { UserCheckReqMessage, UserCheckResMessage } from "@microservices/types/dist/user-bridge";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_BRIDGE_CHECK)
  async userCheck(
    @Payload() payload: UserCheckReqMessage
  ): Promise<UserCheckResMessage> {
    try {
      const user = await this.usersService.findOne(payload.id);

      return {
        valid: !!user,
        user,
      };
    } catch (error) {
      return {
        valid: false,
        error,
      };
    }
  }
}
