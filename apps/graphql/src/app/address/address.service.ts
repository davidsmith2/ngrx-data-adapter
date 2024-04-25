import { Injectable } from "@nestjs/common";
import { AddressType } from "./address.types";
import fetch from 'node-fetch';

@Injectable()
export class AddressService {
  async findAddressById(id: number): Promise<AddressType> {
    console.log(id)
    const response = await fetch(`http://localhost:8080/rest/address/${id}`);
    const data = await response.json() as AddressType;
    return data;
  }

}
