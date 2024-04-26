import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CompanyType } from "../company/company.types";

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

  @Field(type => CompanyType, {nullable: true})
  company: CompanyType;

}
