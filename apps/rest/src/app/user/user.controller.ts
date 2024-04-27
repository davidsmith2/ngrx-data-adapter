import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Company, User } from '@ngrx-data-adapter/api-interfaces';
import { getCompaniesByCompanyIds } from '../company/company.data';
import { UserDao } from './user.dao';
import { getUsersByIds } from './user.data';
import { CompanyDao } from '../company/company.dao';
import { Permission } from 'libs/api-interfaces/src/lib/permission/permission.interface';
import { PermissionService } from '../permission/permission.service';
import { PermissionDao } from '../permission/permission.dao';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly permissionService: PermissionService
  ) {}

  @Post()
  add(@Body() user: User): User {
    let userDao: UserDao = this.dtoToDao(user);
    userDao = this.userService.add(userDao);
    console.log(this.daoToDto(userDao))
    return this.daoToDto(userDao);
  }

  @Delete(':id')
  delete(@Param('id') id: number): User {
    const userDao: UserDao = this.userService.delete(+id);
    return this.daoToDto(userDao);
  }

  @Get(':id')
  getByKey(@Param('id') id: number): User {
    const userDao: UserDao = this.userService.getByKey(+id);
    return this.daoToDto(userDao);
  }

  @Get()
  getMany(@Query() query: any): Array<User> {
    const firstName: string = query.firstName;
    let userDaos: Array<UserDao>;
    if (firstName) {
      userDaos = this.userService.getWithQuery(firstName);
    } else {
      userDaos = this.userService.getAll();
    }
    return userDaos.map((userDao: UserDao) => this.daoToDto(userDao));
  }

  @Put()
  update(@Body() user: Partial<User>): User {
    let userDao: UserDao = this.dtoToDao(user as User);
    userDao = this.userService.update({...user, id: +user.id});
    return this.daoToDto(userDao);
  }

  @Put(':id')
  upsert(@Param('id') id: number, @Body() user: User): User {
    let userDao: UserDao = this.dtoToDao(user);
    userDao = this.userService.upsert(+id, user);
    return this.daoToDto(userDao);
  }

  private dtoToDao(user: User): UserDao {
    let userCopy: User = {...user};
    if (user.companies) {
      userCopy = {...userCopy, companyIds: user.companies.map(company => company.id)};
    }
    return userCopy;
  }

  private daoToDto(userDao: UserDao): User {
    let user: User = {...userDao} as User;
    if (userDao.companyIds) {
      const companyDaos: Array<CompanyDao> = getCompaniesByCompanyIds(userDao.companyIds);
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
    const permissionDao: PermissionDao = this.permissionService.getPermissionByUserId(userDao.id);
    if (permissionDao) {
      const permission: Permission = {
        id: permissionDao.id,
        level: permissionDao.level,
        description: permissionDao.description,
        userId: userDao.id
      };
      user = {...user, permission};
    }
    return user;
  }

}
