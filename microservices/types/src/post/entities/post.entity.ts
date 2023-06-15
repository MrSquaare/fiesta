import { ObjectType, Field, ID } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "../../user/entities/user.entity";

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  @Field(() => String)
  created_at: string;

  @PrimaryColumn({ type: "uuid" })
  @Field(() => ID)
  author_id: string;

  @Field(() => User)
  author?: User;
}
