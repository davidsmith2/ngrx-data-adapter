import { Controller, Get, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '@ngrx-data-adapter/api-interfaces';
import { CompanyDao } from './company.dao';
import { CompanyMapper } from './company.mapper';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly companyMapper: CompanyMapper<CompanyDao, Company>
  ) {}

  @Get()
  getAll(): Array<Company> {
    const daos: Array<CompanyDao> = this.companyService.getCompanies();
    return daos.map((dao: CompanyDao) => this.companyMapper.mapDaoToDto(dao));
  }

  @Get(':id')
  getByKey(@Param('id') id: number): Company {
    const dao: CompanyDao = this.companyService.getCompanyById(Number(id));
    return this.companyMapper.mapDaoToDto(dao);
  }

}
