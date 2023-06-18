import { TimelineDTO } from "@common/types";
import { ObjectType, Field, ID, Directive } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../base";
import { Post } from "../post";

@Entity()
@ObjectType()
@Directive("@shareable")
@Directive('@key(fields: "id")')
export class Timeline extends BaseEntity implements TimelineDTO {
  @Column("simple-array", { default: "" })
  @Field(() => [ID])
  @IsString()
  post_ids: string[];

  @Field(() => [Post])
  posts: Post[];
}
