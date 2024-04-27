import { UserDao } from "./user.dao";

export const USER_DATA: Array<UserDao> = [
  {
    id: 100,
    firstName: 'Mark',
    lastName: 'Zuckerberg',
    companyIds: [200] 
  },
  {
    id: 101,
    firstName: 'Jeff',
    lastName: 'Bezos',
    companyIds: [201]
  },
  {
    id: 102,
    firstName: 'Ted',
    lastName: 'Sarandos',
    companyIds: [202] 
  },
  {
    id: 103,
    firstName: 'Sundar',
    lastName: 'Pichai',
    companyIds: [203] 
  },
  {
    id: 104,
    firstName: 'Elon',
    lastName: 'Musk',
    companyIds: [204, 205] 
  }
];

export function getUsersByIds(ids: Array<number>): Array<UserDao> {
  return USER_DATA.filter(user => ids.includes(user.id));
}
