import { ObjectType, Field } from "@nestjs/graphql";
import * as bcrypt from "bcrypt";
import { IsEmail, IsInt, IsString, Matches } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

import { BaseEntity } from "../../base";
import { AccountDTO } from "../dto/account.dto";

const passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

@Entity()
@ObjectType()
export class Account extends BaseEntity implements AccountDTO {
  @Column({ unique: true })
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  @IsString()
  @Matches(passwordRegex, {
    message:
      "password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
  })
  password: string;

  @Column("int", { array: true, default: "ARRAY[]" })
  @Field(() => [Number])
  @IsInt({ each: true })
  roles: number[];

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
