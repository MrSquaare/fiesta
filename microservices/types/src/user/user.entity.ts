import { UserDTO } from "@common/types";
import { ObjectType, Field, Int, Directive, ID } from "@nestjs/graphql";
import { IsNumber, IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

import { Account } from "../account";
import { BaseEntity } from "../base";

@Entity()
@ObjectType()
@Directive("@shareable")
@Directive('@key(fields: "id")')
export class User extends BaseEntity implements UserDTO {
  @PrimaryColumn({ type: "uuid" })
  @Field(() => ID)
  @IsUUID()
  account_id: string;

  @Field(() => Account)
  account: Account;

  @PrimaryColumn()
  @Field(() => String)
  @IsString()
  username: string;

  @Column()
  @Field(() => String)
  @IsString()
  display_name: string;

  @Column({ default: "" })
  @Field(() => String)
  @IsString()
  biography: string;

  @Column({ default: 0 })
  @Field(() => Int)
  @IsNumber()
  followers_count: number;

  @Column({ default: 0 })
  @Field(() => Int)
  @IsNumber()
  following_count: number;
}
