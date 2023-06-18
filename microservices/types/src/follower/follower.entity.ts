import { FollowerDTO } from "@common/types";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { Entity, PrimaryColumn } from "typeorm";

import { BaseEntity } from "../base";
import { User } from "../user";

@Entity()
@ObjectType()
export class Follower extends BaseEntity implements FollowerDTO {
  @PrimaryColumn({ type: "uuid" })
  @Field(() => ID)
  @IsUUID()
  user_id: string;

  @PrimaryColumn({ type: "uuid" })
  @Field(() => ID)
  @IsUUID()
  follower_id: string;

  @Field(() => User)
  user: User;

  @Field(() => User)
  follower: User;
}
