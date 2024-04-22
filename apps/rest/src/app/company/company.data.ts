import { ADDRESS_DATA } from "../address/address.data";
import { CompanyDao } from "./company.dao";

export const COMPANY_DATA: Array<CompanyDao> = [
  {
    id: 1,
    name: 'Meta',
    addressId: 1,
    address: ADDRESS_DATA[0],
    users: [1]
  },
  {
    id: 2,
    name: 'Amazon',
    addressId: 2,
    address: ADDRESS_DATA[1],
    users: [2]
  },
  {
    id: 3,
    name: 'Netflix',
    addressId: 3,
    address: ADDRESS_DATA[2],
    users: [3]
  },
  {
    id: 4,
    name: 'Google',
    addressId: 4,
    address: ADDRESS_DATA[3],
    users: [4]
  },
  {
    id: 5,
    name: 'Tesla',
    addressId: 5,
    address: ADDRESS_DATA[4],
    users: [5]
  },
  {
    id: 6,
    name: 'SpaceX',
    addressId: 6,
    address: ADDRESS_DATA[5],
    users: [5]
  }
];

export function getCompaniesByCompanyIds(companyIds: Array<number>): Array<CompanyDao> {
  return COMPANY_DATA.filter(company => companyIds.includes(company.id));
}
