import { TimelineDTO } from "@common/types";
import { ObjectType, Field, ID, Directive } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../base";

import { TimelineItem } from "./timeline-item.entity";

@Entity()
@ObjectType()
@Directive("@shareable")
@Directive('@key(fields: "id")')
export class Timeline extends BaseEntity implements TimelineDTO {
  @Column("simple-array", { default: "" })
  @Field(() => [ID])
  @IsUUID("all", { each: true })
  item_ids: string[];

  @Field(() => [TimelineItem])
  items: TimelineItem[];
}
