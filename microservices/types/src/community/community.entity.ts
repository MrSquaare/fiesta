import { CommunityDTO } from "@common/types";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../base";
import { User } from "../user";

@Entity()
@ObjectType()
export class Community extends BaseEntity implements CommunityDTO {
  @Column()
  @Field(() => String)
  @IsString()
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ type: "uuid", nullable: true })
  @Field(() => ID)
  @IsUUID()
  creator_id?: string;

  @Field(() => User)
  creator?: User;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  is_official: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  is_verified: boolean;
}
