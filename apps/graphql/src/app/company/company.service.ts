import { Injectable } from "@nestjs/common";
import { CompanyType } from "./company.types";
import fetch from 'node-fetch';

@Injectable()
export class CompanyService {
  async findCompanies(): Promise<Array<CompanyType>> {
    const response = await fetch(`http://localhost:8080/rest/company`);
    const data = await response.json() as Array<CompanyType>;
    return data;
  }

  async findCompanyById(id: number): Promise<CompanyType> {
    const response = await fetch(`http://localhost:8080/rest/company/${id}`);
    const data = await response.json() as CompanyType;
    return data;
  }

}
