import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsUUID } from "class-validator";
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

import { BaseDTO } from "../dto/base.dto";

@Entity({ synchronize: false })
@ObjectType()
export class BaseEntity implements BaseDTO {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  @IsUUID()
  id: string;

  @CreateDateColumn()
  @Field(() => String)
  @IsDateString()
  created_at: string;

  @UpdateDateColumn()
  @Field(() => String)
  @IsDateString()
  updated_at: string;

  @VersionColumn()
  @Field(() => Int)
  @IsDateString()
  version: number;
}
