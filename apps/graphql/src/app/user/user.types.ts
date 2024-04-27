import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CompanyType } from "../company/company.types";
import { PermissionType } from "../permissions/permission.types";

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({nullable: true})
  permission: PermissionType;

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
