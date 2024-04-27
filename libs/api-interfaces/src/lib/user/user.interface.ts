import { Company } from "../company/company.interface";
import { Permission } from "../permission/permission.interface";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  permission: Permission;
  companyIds: Array<number>;
  companies: Array<Company>;
}
