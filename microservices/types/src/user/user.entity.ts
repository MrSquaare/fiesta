import { UserDTO } from "@common/types";
import { ObjectType, Field, Int, Directive, ID } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

import { Account } from "../account";
import { BaseEntity } from "../base";
import { Timeline } from "../timeline";

@Entity()
@ObjectType()
@Directive("@shareable")
@Directive('@key(fields: "id")')
export class User extends BaseEntity implements UserDTO {
  @PrimaryColumn({ type: "uuid", unique: true })
  @Field(() => ID)
  @IsUUID()
  account_id: string;

  @Field(() => Account)
  account: Account;

  @Column({ unique: true })
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

  @Column({ type: "uuid", unique: true })
  @Field(() => ID)
  @IsUUID()
  timeline_id: string;

  @Field(() => Timeline)
  timeline?: Timeline;

  @Column({ type: "uuid", unique: true })
  @Field(() => ID)
  @IsUUID()
  for_you_timeline_id: string;

  @Field(() => Timeline)
  for_you_timeline?: Timeline;

  @Column({ type: "uuid", unique: true })
  @Field(() => ID)
  @IsUUID()
  following_timeline_id: string;

  @Field(() => Timeline)
  following_timeline?: Timeline;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  is_official: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  is_verified: boolean;
}
