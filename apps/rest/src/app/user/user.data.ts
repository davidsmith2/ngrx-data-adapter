import { UserDao } from "./user.dao";

export const USER_DATA: Array<UserDao> = [
  {
    id: 1,
    firstName: 'Mark',
    lastName: 'Zuckerberg',
    permissions: {
      level: 1
    },
    companyIds: [1] 
  },
  {
    id: 2,
    firstName: 'Jeff',
    lastName: 'Bezos',
    permissions: {
      level: 1
    },
    companyIds: [2]
  },
  {
    id: 3,
    firstName: 'Ted',
    lastName: 'Sarandos',
    permissions: {
      level: 1
    },
    companyIds: [3] 
  },
  {
    id: 4,
    firstName: 'Sundar',
    lastName: 'Pichai',
    permissions: {
      level: 1
    },
    companyIds: [4] 
  },
  {
    id: 5,
    firstName: 'Elon',
    lastName: 'Musk',
    permissions: {
      level: 1
    },
    companyIds: [5, 6] 
  }
];

export function getUsersByIds(ids: Array<number>): Array<UserDao> {
  return USER_DATA.filter(user => ids.includes(user.id));
}
