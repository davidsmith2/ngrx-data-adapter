import { Injectable } from '@nestjs/common';
import { COMPANY_DATA } from './company.data';
import { CompanyDao } from './company.dao';

@Injectable()
export class CompanyService {
  getCompanies(): Array<CompanyDao> {
    const companies = COMPANY_DATA;
    return companies;
  }
  getCompanyById(id: number): CompanyDao {
    const company = COMPANY_DATA.find(company => company.id === id);
    return company;
  }
}
