import { AUTH_BRIDGE_CHECK } from "@microservices/common/dist/modules/auth-bridge";
import { AuthCheckReqMessage, AuthCheckResMessage } from "@microservices/types/dist";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_BRIDGE_CHECK)
  async authCheck(
    @Payload() reqMsg: AuthCheckReqMessage
  ): Promise<AuthCheckResMessage> {
    try {
      const account = await this.authService.authenticate(reqMsg.token);
      const authorized = await this.authService.authorize(account, []);

      return {
        valid: authorized,
        account,
      };
    } catch (error) {
      return {
        valid: false,
        error,
      };
    }
  }
}
