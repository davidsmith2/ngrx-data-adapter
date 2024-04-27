import { Injectable } from "@nestjs/common";
import { Mapper } from "../mapper.interface";
import { PermissionDao } from './permission.dao';
import { Permission } from "libs/api-interfaces/src/lib/permission/permission.interface";

@Injectable()
export class PermissionMapper<DAO extends PermissionDao, DTO extends Permission> implements Mapper<DAO, DTO> {
  mapDaoToDto(permissionDao: DAO): DTO {
    return {
      id: permissionDao.id,
      level: permissionDao.level,
      description: permissionDao.description,
      userId: permissionDao.userId
    } as DTO;
  }
  mapDtoToDao(dto: DTO): DAO {
    throw new Error("Method not implemented.");
  }
}
