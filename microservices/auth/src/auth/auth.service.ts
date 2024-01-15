import { AccountDTO } from "@common/types";
import { AccountBridgeService } from "@microservices/common/dist/modules/account-bridge";
import { Auth } from "@microservices/types/dist/auth";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import * as nJWT from "njwt";

import { JwtBody } from "../types/jwt";

import { SignInInput } from "./dto/sign-in.input";
import { SignUpInput } from "./dto/sign-up.input";

@Injectable()
export class AuthService {
  constructor(private readonly accountBridgeService: AccountBridgeService) {}

  async signIn(signInInput: SignInInput) {
    const account = await this.accountBridgeService.getByCredentials(
      signInInput.email,
      signInInput.password,
    );

    const auth = new Auth();

    auth.token = this.generateToken(account.id);

    return auth;
  }

  async signUp(signUpInput: SignUpInput) {
    const account = await this.accountBridgeService.createByCredentials(
      signUpInput.email,
      signUpInput.password,
    );

    const auth = new Auth();

    auth.token = this.generateToken(account.id);

    return auth;
  }

  async authenticate(token: string): Promise<AccountDTO> {
    try {
      const jwtBody = this.verifyToken(token);

      if (!jwtBody.id) {
        throw new BadRequestException("Invalid token");
      }

      const account = await this.accountBridgeService.checkAccount(jwtBody.id);

      return account;
    } catch (e) {
      throw new BadRequestException("Invalid token");
    }
  }

  async authorize(account: AccountDTO, roles?: number[]) {
    const authorized =
      !roles?.length || roles.some((role) => account.roles.includes(role));

    if (!authorized) {
      throw new ForbiddenException("Unauthorized");
    }

    return true;
  }

  private generateToken(id: string) {
    const jwtBody: JwtBody = { id };
    const jwt = nJWT.create(jwtBody, process.env.JWT_SECRET);

    return jwt.compact();
  }

  private verifyToken(token: string) {
    const jwt = nJWT.verify(token, process.env.JWT_SECRET);

    return jwt.body as unknown as JwtBody;
  }
}
