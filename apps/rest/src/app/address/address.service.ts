import { Injectable } from '@nestjs/common';
import { ADDRESS_DATA } from './address.data';

@Injectable()
export class AddressService {
  getAddresses() {
    return ADDRESS_DATA.slice();
  }
  getAddressById(id: number) {
    return ADDRESS_DATA.find((address) => address.id === id);
  }
}
