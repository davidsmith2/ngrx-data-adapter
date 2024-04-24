import { UserDao } from "./user.dao";

export const USER_DATA: Array<UserDao> = [
  {
    id: 100,
    firstName: 'Mark',
    lastName: 'Zuckerberg',
    permissions: {
      level: 1
    },
    companyIds: [200] 
  },
  {
    id: 101,
    firstName: 'Jeff',
    lastName: 'Bezos',
    permissions: {
      level: 1
    },
    companyIds: [201]
  },
  {
    id: 102,
    firstName: 'Ted',
    lastName: 'Sarandos',
    permissions: {
      level: 1
    },
    companyIds: [202] 
  },
  {
    id: 103,
    firstName: 'Sundar',
    lastName: 'Pichai',
    permissions: {
      level: 1
    },
    companyIds: [203] 
  },
  {
    id: 104,
    firstName: 'Elon',
    lastName: 'Musk',
    permissions: {
      level: 1
    },
    companyIds: [204, 205] 
  }
];

export function getUsersByIds(ids: Array<number>): Array<UserDao> {
  return USER_DATA.filter(user => ids.includes(user.id));
}
