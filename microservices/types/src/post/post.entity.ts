import { PostDTO } from "@common/types";
import { ObjectType, Field, ID, Directive } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "../base";
import { User } from "../user/user.entity";

@Entity()
@ObjectType()
@Directive("@shareable")
@Directive('@key(fields: "id")')
export class Post extends BaseEntity implements PostDTO {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Column()
  @Field(() => String)
  @IsString()
  content: string;

  @PrimaryColumn({ type: "uuid" })
  @Field(() => ID)
  @IsUUID()
  author_id: string;

  @Field(() => User)
  author?: User;
}
