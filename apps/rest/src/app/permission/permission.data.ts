import { PermissionDao } from "./permission.dao";

export const PERMISSION_DATA: Array<PermissionDao> = [
  {
    id: 400,
    level: 1,
    description: 'Extra large',
    userId: 100
  },
  {
    id: 401,
    level: 2,
    description: 'Large',
    userId: 101
  },
  {
    id: 402,
    level: 3,
    description: 'Medium',
    userId: 102
  },
  {
    id: 403,
    level: 4,
    description: 'Small',
    userId: 103
  },
  {
    id: 404,
    level: 5,
    description: 'Extra small',
    userId: 104
  }
]
