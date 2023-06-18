import { AccountRole } from "@common/types";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  Inject,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";

import { AuthBridgeService } from "./auth-bridge.service";

@Injectable()
export class AuthBridgeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
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
    const handler = context.getHandler();
    const roles = this.reflector.get<AccountRole[]>("roles", handler);

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

    const account = await this.authBridgeService.checkAuth(token, roles);

    request.account = account;

    return true;
  }
}
