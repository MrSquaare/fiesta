import { ObjectType, Field, Int, Directive } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity } from "typeorm";

import { BaseEntity } from "../../base";
import { UserDTO } from "../dto/user.dto";

@Entity()
@ObjectType()
@Directive("@shareable")
@Directive('@key(fields: "id")')
export class User extends BaseEntity implements UserDTO {
  @Column({ unique: true })
  @Field(() => String)
  @IsString()
  username: string;

  @Column()
  @Field(() => String)
  @IsString()
  display_name: string;

  @Column({ default: "" })
  @Field(() => String)
  @IsString()
  biography: string;

  @Column({ default: 0 })
  @Field(() => Int)
  @IsNumber()
  followers_count: number;

  @Column({ default: 0 })
  @Field(() => Int)
  @IsNumber()
  following_count: number;
}
