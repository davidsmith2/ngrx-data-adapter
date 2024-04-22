import { Args, Query, Resolver } from "@nestjs/graphql";
import { CompanyType } from "./company.types";
import { CompanyService } from "./company.service";

@Resolver(() => CompanyType)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query(() => [CompanyType!]!)
  async selectAll_companies(): Promise<Array<CompanyType>> {
    return this.companyService.findCompanies();
  }

  @Query(() => CompanyType)
  async selectOne_company(@Args('id', { type: () => Number }) id: number): Promise<CompanyType> {
    return this.companyService.findCompanyById(id);
  }
}

