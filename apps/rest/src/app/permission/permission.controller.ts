import { Controller, Get, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from 'libs/api-interfaces/src/lib/permission/permission.interface';
import { PermissionDao } from './permission.dao';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  getAll(): Array<Permission> {
    const daos: Array<PermissionDao> = this.permissionService.getPermissions();
    return daos.map((dao: PermissionDao) => this.daoToDto(dao));
  }

  @Get(':id')
  getByKey(@Param('id') id: number): Permission {
    const dao: PermissionDao = this.permissionService.getPermissionById(Number(id));
    return this.daoToDto(dao);
  }

  private daoToDto(dao: PermissionDao): Permission {
    return dao as Permission;
  }
}
