import { Account } from "@microservices/types/dist/account";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountsResolver } from "./accounts.resolver";
import { AccountsService } from "./accounts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountsResolver, AccountsService],
})
export class AccountsModule {}
