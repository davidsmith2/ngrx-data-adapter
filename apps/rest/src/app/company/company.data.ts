import { ADDRESS_DATA } from "../address/address.data";
import { CompanyDao } from "./company.dao";

export const COMPANY_DATA: Array<CompanyDao> = [
  {
    id: 200,
    name: 'Meta',
    addressId: ADDRESS_DATA[0].id,
    address: ADDRESS_DATA[0],
    users: [100]
  },
  {
    id: 201,
    name: 'Amazon',
    addressId: ADDRESS_DATA[1].id,
    address: ADDRESS_DATA[1],
    users: [101]
  },
  {
    id: 202,
    name: 'Netflix',
    addressId: ADDRESS_DATA[2].id,
    address: ADDRESS_DATA[2],
    users: [102]
  },
  {
    id: 203,
    name: 'Google',
    addressId: ADDRESS_DATA[3].id,
    address: ADDRESS_DATA[3],
    users: [103]
  },
  {
    id: 204,
    name: 'Tesla',
    addressId: ADDRESS_DATA[4].id,
    address: ADDRESS_DATA[4],
    users: [104]
  },
  {
    id: 205,
    name: 'SpaceX',
    addressId: ADDRESS_DATA[5].id,
    address: ADDRESS_DATA[5],
    users: [104]
  }
];

export function getCompaniesByCompanyIds(companyIds: Array<number>): Array<CompanyDao> {
  return COMPANY_DATA.filter(company => companyIds.includes(company.id));
}
