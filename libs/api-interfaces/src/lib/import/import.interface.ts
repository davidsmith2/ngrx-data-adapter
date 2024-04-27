import { Address } from "../address/address.interface";
import { Company } from "../company/company.interface";
import { Permission } from "../permission/permission.interface";
import { User } from "../user/user.interface";

export interface Import {
  users: Array<User>;
  companies: Array<Company>;
  addresses: Array<Address>;
  permissions: Array<Permission>;
}