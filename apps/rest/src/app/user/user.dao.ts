export interface UserDao {
  id: number;
  firstName: string;
  lastName: string;
  permissions: {
    level: number;
  },
  companyIds: number[];
}