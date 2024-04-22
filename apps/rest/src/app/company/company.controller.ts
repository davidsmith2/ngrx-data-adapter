import { Controller, Get, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company, User } from '@ngrx-data-adapter/api-interfaces';
import { CompanyDao } from './company.dao';
import { getUsersByIds } from '../user/user.data';
import { UserDao } from '../user/user.dao';
import { getCompaniesByCompanyIds } from './company.data';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getAll(): Array<Company> {
    const daos: Array<CompanyDao> = this.companyService.getCompanies();
    return daos.map(this.daoToDto);
  }

  @Get(':id')
  getByKey(@Param('id') id: number): Company {
    const dao: CompanyDao = this.companyService.getCompanyById(Number(id));
    return this.daoToDto(dao);
  }

  private daoToDto(companyDao: CompanyDao): Company {
    return {
      id: companyDao.id,
      name: companyDao.name,
      addressId: companyDao.addressId,
      address: companyDao.address,
      users: getUsersByIds(companyDao.users).map((userDao: UserDao) => {
        if (userDao.companyIds) {
          return {...userDao, companyIds: userDao.companyIds} as User;
        }
        return {...userDao} as User;
      })
    };
  }

}
