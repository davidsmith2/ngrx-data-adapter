import { Controller, Get, Param } from '@nestjs/common';
import { Address } from '@ngrx-data-adapter/api-interfaces';
import { AddressDao } from './address.dao';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  getByKey(@Param('id') id: number): Address {
    console.log(id)
    const dao: AddressDao = this.addressService.getAddressById(Number(id));
    return this.daoToDto(dao);
  }

  private daoToDto(addressDao: AddressDao): Address {
    return addressDao as Address;
  }
}
