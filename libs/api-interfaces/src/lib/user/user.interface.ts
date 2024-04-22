import { Company } from "../company/company.interface";
import { Permissions } from "./permissions.interface";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  permissions: Permissions;
  companyIds: Array<number>;
  companies: Array<Company>;
}
