import { Controller, Get, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Address, Company, User } from '@ngrx-data-adapter/api-interfaces';
import { CompanyDao } from './company.dao';
import { getUsersByIds } from '../user/user.data';
import { UserDao } from '../user/user.dao';
import { AddressService } from '../address/address.service';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly addressService: AddressService
  ) {}

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
      address: {
        id: companyDao.address.id,
        street: companyDao.address.street,
        city: companyDao.address.city,
        country: companyDao.address.country
      },
      users: getUsersByIds(companyDao.users).map((userDao: UserDao) => {
        if (userDao.companyIds) {
          return {...userDao, companyIds: userDao.companyIds} as User;
        }
        return {...userDao} as User;
      })
    };
  }

}
