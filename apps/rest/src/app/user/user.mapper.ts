import { Company, User } from "@ngrx-data-adapter/api-interfaces";
import { Mapper } from "../mapper.interface";
import { UserDao } from "./user.dao";
import { CompanyDao } from "../company/company.dao";
import { getCompaniesByCompanyIds } from "../company/company.data";
import { getUsersByIds } from "./user.data";
import { PermissionDao } from "../permission/permission.dao";
import { PermissionService } from "../permission/permission.service";
import { Permission } from "libs/api-interfaces/src/lib/permission/permission.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMapper<DAO extends UserDao, DTO extends User> implements Mapper<DAO, DTO> {
  constructor(private permissionService: PermissionService) {}
  mapDaoToDto(dao: DAO): DTO {
    let user: Partial<User> = {
      id: dao.id,
      firstName: dao.firstName,
      lastName: dao.lastName
    };
    if (dao.companyIds) {
      const companyDaos: Array<CompanyDao> = getCompaniesByCompanyIds(dao.companyIds);
      const companies: Array<Company> = companyDaos.map(companyDao => {
        const userDaos: Array<UserDao> = getUsersByIds(companyDao.users);
        const users: Array<User> = userDaos.map(user => {
          return {...user} as User;
        });
        const company: Company = {
          id: companyDao.id,
          name: companyDao.name,
          addressId: companyDao.addressId,
          address: {
            id: companyDao.address.id,
            street: companyDao.address.street,
            city: companyDao.address.city,
            country: companyDao.address.country
          },
          users
        };
        return {...company, users};
      })
      user = {...user, companies};
    }
    const permissionDao: PermissionDao = this.permissionService.getPermissionByUserId(dao.id);
    if (permissionDao) {
      const permission: Permission = {
        id: permissionDao.id,
        level: permissionDao.level,
        description: permissionDao.description,
        userId: dao.id
      };
      user = {...user, permission};
    }
    return user as DTO;
  }
  mapDtoToDao(dto: DTO): DAO {
    let userDao: Partial<UserDao> = {
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName
    };
    if (dto.companies) {
      userDao.companyIds = dto.companies.map(company => company.id);
    }
    return userDao as DAO;
  }
}