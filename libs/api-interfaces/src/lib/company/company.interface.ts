import { Address } from "../address/address.interface";
import { User } from "../user/user.interface";

export interface Company {
  id: number;
  name: string;
  addressId: number;
  address: Address;
  users: User[];
}
