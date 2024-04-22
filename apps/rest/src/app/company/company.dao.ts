import { Address } from "@ngrx-data-adapter/api-interfaces";

export interface CompanyDao {
  id: number;
  name: string;
  addressId: number;
  address: Address;
  users: number[];
}