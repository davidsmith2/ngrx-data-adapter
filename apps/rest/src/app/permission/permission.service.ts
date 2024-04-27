import { Injectable } from '@nestjs/common';
import { PERMISSION_DATA } from './permission.data';
import { PermissionDao } from './permission.dao';

@Injectable()
export class PermissionService {
  getPermissions(): Array<PermissionDao> {
    return PERMISSION_DATA.slice();
  }
  getPermissionById(id: number): PermissionDao {
    return PERMISSION_DATA.find((permissionDao: PermissionDao) => permissionDao.id === id);
  }
  getPermissionByUserId(userId: number): PermissionDao {
    return PERMISSION_DATA.find((permissionDao: PermissionDao) => permissionDao.userId === userId);
  }
}
