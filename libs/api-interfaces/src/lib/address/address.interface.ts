import { Company } from "../company/company.interface";

export interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
  company?: Company;
}
