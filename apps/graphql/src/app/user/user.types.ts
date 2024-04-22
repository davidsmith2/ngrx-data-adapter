import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import { PermissionsType } from "../permissions/permissions.types";
import { CompanyType } from "../company/company.types";

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({nullable: true})
  permissions: PermissionsType;

  @Field(type => [Int], {nullable: true})
  companyIds: Array<number>;

  @Field(type => [CompanyType], {nullable: true})
  companies: Array<CompanyType>;

}

@InputType()
export class UpsertUserInput {
  @Field(() => Int)
  id: number;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}
