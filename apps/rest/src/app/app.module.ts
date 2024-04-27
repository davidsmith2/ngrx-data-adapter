import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { CompanyController } from './company/company.controller';
import { AddressController } from './address/address.controller';
import { UserService } from './user/user.service';
import { CompanyService } from './company/company.service';
import { AddressService } from './address/address.service';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { ImportController } from './import/import.controller';
import { ImportService } from './import/import.service';
import { PermissionMapper } from './permission/permission.mapper';
import { AddressMapper } from './address/address.mapper';
import { CompanyMapper } from './company/company.mapper';
import { UserMapper } from './user/user.mapper';

@Module({
  imports: [],
  controllers: [
    UserController,
    CompanyController,
    AddressController,
    PermissionController,
    ImportController
  ],
  providers: [
    UserService,
    CompanyService,
    AddressService,
    PermissionService,
    ImportService,
    PermissionMapper,
    AddressMapper,
    CompanyMapper,
    UserMapper
  ],
})
export class AppModule {}
