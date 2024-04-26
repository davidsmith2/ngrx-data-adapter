import { Controller, Get, Param } from '@nestjs/common';
import { Address, Company } from '@ngrx-data-adapter/api-interfaces';
import { AddressDao } from './address.dao';
import { AddressService } from './address.service';
import { CompanyService } from '../company/company.service';
import { CompanyDao } from '../company/company.dao';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly companyService: CompanyService
  ) {}

  @Get()
  getAll(): Array<Address> {
    const daos: Array<AddressDao> = this.addressService.getAddresses();
    return daos.map((dao: AddressDao) => this.daoToDto(dao));
  }

  @Get(':id')
  getByKey(@Param('id') id: number): Address {
    const dao: AddressDao = this.addressService.getAddressById(Number(id));
    return this.daoToDto(dao);
  }

  private daoToDto(addressDao: AddressDao): Address {
    const companyDao: CompanyDao = this.companyService.getCompanyById(addressDao.company);
    return {
      id: addressDao.id,
      street: addressDao.street,
      city: addressDao.city,
      country: addressDao.country,
      company: {
        id: companyDao.id,
        name: companyDao.name
      } as Company,
    };
  }
}
