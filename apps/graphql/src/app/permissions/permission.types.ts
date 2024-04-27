import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PermissionType {
  @Field(() => Int)
  id: number;

  @Field()
  level: number;

  @Field({nullable: true})
  description: string;

  @Field()
  userId: number;

}

