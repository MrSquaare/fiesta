import { Account } from "@microservices/types/dist/account";
import { Auth } from "@microservices/types/dist/auth";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as nJWT from "njwt";
import { Repository } from "typeorm";

import { JwtBody } from "../types/jwt";

import { SignInInput } from "./dto/sign-in.input";
import { SignUpInput } from "./dto/sign-up.input";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {}

  async signIn(signInInput: SignInInput) {
    const account = await this.accountsRepository.findOne({
      where: { email: signInInput.email },
      select: ["id", "password"],
    });

    if (!account) {
      throw new ForbiddenException("Invalid credentials");
    }

    if (!account.checkPassword(signInInput.password)) {
      throw new ForbiddenException("Invalid credentials");
    }

    const auth = new Auth();

    auth.token = this.generateToken(account.id);

    return auth;
  }

  async signUp(signUpInput: SignUpInput) {
    const account = this.accountsRepository.create(signUpInput);
    const savedAccount = await this.accountsRepository.save(account);

    const auth = new Auth();

    auth.token = this.generateToken(savedAccount.id);

    return auth;
  }

  async authenticate(token: string): Promise<Account> {
    try {
      const jwtBody = this.verifyToken(token);

      if (!jwtBody.id) {
        throw new BadRequestException("Invalid token");
      }

      const account = await this.accountsRepository.findOne({
        where: { id: jwtBody.id },
      });

      return account;
    } catch (e) {
      throw new BadRequestException("Invalid token");
    }
  }

  async authorize(account: Account, roles?: number[]) {
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
