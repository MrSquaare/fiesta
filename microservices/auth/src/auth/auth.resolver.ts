import { Auth } from "@microservices/types/dist/auth";
import { Args, Resolver, Mutation } from "@nestjs/graphql";

import { AuthService } from "./auth.service";
import { SignInInput } from "./dto/sign-in.input";
import { SignUpInput } from "./dto/sign-up.input";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signIn(@Args("signInInput") signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Mutation(() => Auth)
  async signUp(@Args("signUpInput") signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }
}
