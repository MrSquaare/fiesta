import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { UserBridgeService } from "./user-bridge.service";

export class AccountUserBridgeInterceptor implements NestInterceptor {
  constructor(
    @Inject(UserBridgeService)
    private readonly userBridgeService: UserBridgeService
  ) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const request = this.getRequest(context);

    if (!request.account) {
      throw new BadRequestException("Account not found");
    }

    const user = await this.userBridgeService.getAccountUser(
      request.account.id
    );

    request.user = user;

    return next.handle();
  }
}
