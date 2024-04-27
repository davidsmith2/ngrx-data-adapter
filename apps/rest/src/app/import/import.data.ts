import { ADDRESS_DATA } from "../address/address.data";
import { COMPANY_DATA } from "../company/company.data";
import { PERMISSION_DATA } from "../permission/permission.data";
import { USER_DATA } from "../user/user.data";
import { ImportDao } from "./import.dao";

export const IMPORT_DATA: ImportDao = {
  users: USER_DATA,
  companies: COMPANY_DATA,
  addresses: ADDRESS_DATA,
  permissions: PERMISSION_DATA
};
