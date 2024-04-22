import { Company, User } from "@ngrx-data-adapter/api-interfaces";

export class UserViewModel {
  constructor(readonly entity: User) { }

  getId(): number {
    return this.entity.id;
  }

  getFullName(): string {
    return `${this.entity.firstName} ${this.entity.lastName}`;
  }

  getCompanyIds(): Array<number> {
    return this.entity.companyIds || null;
  }

  getCompanyNames(): Array<string> {
    return this.entity.companies.map((company: Company) => company.name) || null;
  }
}
