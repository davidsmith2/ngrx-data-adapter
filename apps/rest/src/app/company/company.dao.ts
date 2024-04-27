import { Address } from "@ngrx-data-adapter/api-interfaces";
import { AddressDao } from "../address/address.dao";

export interface CompanyDao {
  id: number;
  name: string;
  addressId: number;
  address: AddressDao;
  users: number[];
}