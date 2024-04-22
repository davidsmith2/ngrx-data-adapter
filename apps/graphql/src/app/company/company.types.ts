import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { AddressType } from "../address/address.types";
import { UserType } from "../user/user.types";

@ObjectType()
export class CompanyType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => Int, {nullable: true})
  addressId: number;

  @Field(type => AddressType, {nullable: true})
  address: AddressType;

  @Field(type => [UserType], {nullable: true})
  users: UserType[];
}

