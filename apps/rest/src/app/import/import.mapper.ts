import { Address, Company, Import, Permission, User } from "@ngrx-data-adapter/api-interfaces";
import { ImportDao } from "./import.dao";
import { Mapper } from "../mapper.interface";
import { Injectable } from "@nestjs/common";
import { UserDao } from "../user/user.dao";
import { UserMapper } from "../user/user.mapper";
import { CompanyMapper } from "../company/company.mapper";
import { CompanyDao } from "../company/company.dao";
import { AddressMapper } from "../address/address.mapper";
import { AddressDao } from "../address/address.dao";
import { PermissionMapper } from "../permission/permission.mapper";
import { PermissionDao } from "../permission/permission.dao";

@Injectable()
export class ImportMapper<DAO extends ImportDao, DTO extends Import> implements Mapper<DAO, DTO> {
  constructor(
    private readonly userMapper: UserMapper<UserDao, User>,
    private readonly companyMapper: CompanyMapper<CompanyDao, Company>,
    private readonly addressMapper: AddressMapper<AddressDao, Address>,
    private readonly permissionMapper: PermissionMapper<PermissionDao, Permission>
    
  ) {}
  mapDaoToDto(dao: DAO): DTO {
    return {
      users: dao.users.map(user => this.userMapper.mapDaoToDto(user)),
      companies: dao.companies.map(company => this.companyMapper.mapDaoToDto(company)),
      addresses: dao.addresses.map(address => this.addressMapper.mapDaoToDto(address)),
      permissions: dao.permissions.map(permission => this.permissionMapper.mapDaoToDto(permission))
    } as DTO;
  }
  mapDtoToDao(dto: DTO): DAO {
    throw new Error("Method not implemented.");
  }
}