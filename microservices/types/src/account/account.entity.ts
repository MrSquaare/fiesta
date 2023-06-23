import { AccountDTO, AccountRole } from "@common/types";
import {
  ObjectType,
  Field,
  Directive,
  registerEnumType,
} from "@nestjs/graphql";
import * as bcrypt from "bcrypt";
import { IsEmail, IsEnum, IsString, Matches } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

import { BaseEntity } from "../base";

const passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

registerEnumType(AccountRole, {
  name: "AccountRole",
});

@Entity()
@ObjectType()
@Directive("@shareable")
@Directive('@key(fields: "id")')
export class Account extends BaseEntity implements AccountDTO {
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  @Matches(passwordRegex, {
    message:
      "password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
  })
  password: string;

  @Column("simple-array", { default: "" })
  @Field(() => [AccountRole])
  @IsEnum(AccountRole, { each: true })
  roles: AccountRole[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
