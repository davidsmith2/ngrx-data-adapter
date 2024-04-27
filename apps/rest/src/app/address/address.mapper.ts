import { Address, Company } from "@ngrx-data-adapter/api-interfaces"
import { AddressDao } from "./address.dao"
import { Mapper } from "../mapper.interface"
import { CompanyService } from "../company/company.service";
import { CompanyDao } from "../company/company.dao";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddressMapper<DAO extends AddressDao, DTO extends Address> implements Mapper<DAO, DTO> {
  constructor(private companyService: CompanyService) {}
  mapDaoToDto(addressDao: DAO): DTO {
    const companyDao: CompanyDao = this.companyService.getCompanyById(addressDao.company);
    const company: Company = {
      id: companyDao.id,
      name: companyDao.name
    } as Company;
    return {
      id: addressDao.id,
      street: addressDao.street,
      city: addressDao.city,
      country: addressDao.country,
      company
    } as DTO;
 }
  mapDtoToDao(dto: DTO): DAO {
    throw new Error("Method not implemented.");
  }
}