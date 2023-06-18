import { AUTH_BRIDGE_CHECK_AUTH } from "@microservices/common/dist/modules/auth-bridge";
import {
  CheckAuthReqMessage,
  CheckAuthResMessage,
} from "@microservices/types/dist/auth-bridge";
import { Controller, UnauthorizedException } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_BRIDGE_CHECK_AUTH)
  async authCheck(
    @Payload() reqMsg: CheckAuthReqMessage
  ): Promise<CheckAuthResMessage> {
    try {
      const account = await this.authService.authenticate(reqMsg.token);
      const authorized = await this.authService.authorize(
        account,
        reqMsg.roles
      );

      if (!authorized) {
        throw new UnauthorizedException("Unauthorized");
      }

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
