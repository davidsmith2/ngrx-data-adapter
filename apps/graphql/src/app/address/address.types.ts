import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AddressType {
  @Field(() => Int)
  id: number;

  @Field({nullable: true})
  street: string;

  @Field({nullable: true})
  city: string;

  @Field({nullable: true})
  country: string;

}
