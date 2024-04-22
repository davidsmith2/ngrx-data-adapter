import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PermissionsType {
  @Field()
  level: number;
}

