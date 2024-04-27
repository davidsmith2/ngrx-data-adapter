import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { CompanyController } from './company/company.controller';
import { AddressController } from './address/address.controller';
import { UserService } from './user/user.service';
import { CompanyService } from './company/company.service';
import { AddressService } from './address/address.service';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    CompanyController,
    AddressController,
    PermissionController
  ],
  providers: [
    UserService,
    CompanyService,
    AddressService,
    PermissionService
  ],
})
export class AppModule {}
