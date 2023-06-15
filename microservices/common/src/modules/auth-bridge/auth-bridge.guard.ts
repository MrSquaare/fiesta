import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
  Inject,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { AuthBridgeService } from "./auth-bridge.service";

@Injectable()
export class AuthBridgeGuard implements CanActivate {
  constructor(
    @Inject(AuthBridgeService)
    private readonly authBridgeService: AuthBridgeService
  ) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new BadRequestException("No authorization provided");
    }

    const [type, token] = authorization.split(" ").map((item) => item.trim());

    if (!type || !token) {
      throw new BadRequestException("Invalid authorization provided");
    }

    if (type !== "Bearer") {
      throw new BadRequestException("Invalid authorization type");
    }

    const account = await this.authBridgeService.checkAuth(token);

    if (!account) {
      throw new ForbiddenException("Unauthorized");
    }

    request.account = account;

    return true;
  }
}
