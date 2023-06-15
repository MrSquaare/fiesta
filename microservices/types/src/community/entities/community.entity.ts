import { Field, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../../base";
import { CommunityDTO } from "../dto/community.dto";

@Entity()
@ObjectType()
export class Community extends BaseEntity implements CommunityDTO {
  @Column()
  @Field(() => String)
  @IsString()
  name: string;
}
