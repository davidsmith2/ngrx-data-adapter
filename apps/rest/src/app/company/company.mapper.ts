import { Company, User } from "@ngrx-data-adapter/api-interfaces";
import { Mapper } from "../mapper.interface";
import { CompanyDao } from "./company.dao";
import { Injectable } from "@nestjs/common";
import { getUsersByIds } from "../user/user.data";
import { UserDao } from "../user/user.dao";

@Injectable()
export class CompanyMapper<DAO extends CompanyDao, DTO extends Company> implements Mapper<DAO, DTO> {
  mapDaoToDto(dao: DAO): DTO {
    const company: Company = {
      id: dao.id,
      name: dao.name,
      addressId: dao.addressId,
      address: {
        id: dao.address.id,
        street: dao.address.street,
        city: dao.address.city,
        country: dao.address.country
      },
      users: getUsersByIds(dao.users).map((userDao: UserDao) => {
        if (userDao.companyIds) {
          return {...userDao, companyIds: userDao.companyIds} as User;
        }
        return {...userDao} as User;
      })
    }
    return company as DTO;
  }
  mapDtoToDao(dto: DTO): DAO {
    throw new Error("Method not implemented.");
  }
}