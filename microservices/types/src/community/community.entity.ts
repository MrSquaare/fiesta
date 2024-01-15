import { CommunityDTO } from "@common/types";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../base";
import { Timeline } from "../timeline";
import { User } from "../user";

@Entity()
@ObjectType()
export class Community extends BaseEntity implements CommunityDTO {
  @Column()
  @Field(() => String)
  @IsString()
  name: string;

  @Column({ default: "" })
  @Field(() => String)
  @IsString()
  description: string;

  @Column({ type: "uuid", nullable: true })
  @Field(() => ID)
  @IsUUID()
  creator_id?: string;

  @Field(() => User)
  creator?: User;

  @Column({ default: 0 })
  @Field(() => Int)
  @IsNumber()
  members_count: number;

  @Column({ type: "uuid", unique: true })
  @Field(() => ID)
  @IsUUID()
  timeline_id: string;

  @Field(() => Timeline)
  timeline?: Timeline;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  is_official: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  is_verified: boolean;
}
