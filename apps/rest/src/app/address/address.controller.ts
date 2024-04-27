import { Controller, Get, Param } from '@nestjs/common';
import { Address } from '@ngrx-data-adapter/api-interfaces';
import { AddressDao } from './address.dao';
import { AddressService } from './address.service';
import { AddressMapper } from './address.mapper';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly addressMapper: AddressMapper<AddressDao, Address>
  ) {}

  @Get()
  getAll(): Array<Address> {
    const daos: Array<AddressDao> = this.addressService.getAddresses();
    return daos.map((dao: AddressDao) => this.addressMapper.mapDaoToDto(dao));
  }

  @Get(':id')
  getByKey(@Param('id') id: number): Address {
    const dao: AddressDao = this.addressService.getAddressById(Number(id));
    return this.addressMapper.mapDaoToDto(dao);
  }

}
