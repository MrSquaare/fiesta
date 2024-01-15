import {
  PostDTO,
  TimelineItemDTO,
  TimelineItemType,
  UserDTO,
} from "@common/types";
import {
  ObjectType,
  Field,
  ID,
  registerEnumType,
  Directive,
} from "@nestjs/graphql";
import { IsEnum, IsUUID } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

import { BaseEntity } from "../base";
import { Post } from "../post";
import { User } from "../user";

import { Timeline } from "./timeline.entity";

registerEnumType(TimelineItemType, {
  name: "TimelineItemType",
});

@Entity()
@ObjectType()
@Directive("@shareable")
@Directive('@key(fields: "id")')
export class TimelineItem extends BaseEntity implements TimelineItemDTO {
  @PrimaryColumn({ type: "uuid" })
  @Field(() => ID)
  @IsUUID()
  timeline_id: string;

  @Field(() => Timeline)
  timeline?: Timeline;

  @Column()
  @Field(() => ID)
  @IsUUID()
  post_id: string;

  @Field(() => Post)
  post?: PostDTO;

  @Column()
  @Field(() => ID)
  @IsUUID()
  user_id: string;

  @Field(() => User)
  user?: UserDTO;

  @Column()
  @Field(() => TimelineItemType)
  @IsEnum(TimelineItemType)
  type: TimelineItemType;
}
