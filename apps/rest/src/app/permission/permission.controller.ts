import { Controller, Get, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionDao } from './permission.dao';
import { PermissionMapper } from './permission.mapper';
import { Permission } from '@ngrx-data-adapter/api-interfaces';

@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly permissionMapper: PermissionMapper<PermissionDao, Permission>
  ) {}

  @Get()
  getAll(): Array<Permission> {
    const daos: Array<PermissionDao> = this.permissionService.getPermissions();
    return daos.map((dao: PermissionDao) => this.permissionMapper.mapDaoToDto(dao));
  }

  @Get(':id')
  getByKey(@Param('id') id: number): Permission {
    const dao: PermissionDao = this.permissionService.getPermissionById(Number(id));
    return this.permissionMapper.mapDaoToDto(dao);
  }

}
