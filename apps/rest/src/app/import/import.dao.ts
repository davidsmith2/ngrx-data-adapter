import { AddressDao } from "../address/address.dao";
import { CompanyDao } from "../company/company.dao";
import { PermissionDao } from "../permission/permission.dao";
import { UserDao } from "../user/user.dao";

export interface ImportDao {
  users: Array<UserDao>;
  companies: Array<CompanyDao>;
  addresses: Array<AddressDao>;
  permissions: Array<PermissionDao>;
}