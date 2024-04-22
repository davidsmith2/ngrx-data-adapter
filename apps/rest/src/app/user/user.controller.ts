import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Company, User } from '@ngrx-data-adapter/api-interfaces';
import { getCompaniesByCompanyIds } from '../company/company.data';
import { UserDao } from './user.dao';
import { getUsersByIds } from './user.data';
import { CompanyDao } from '../company/company.dao';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return userDaos.map(this.daoToDto);
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
    let a = {...user};
    if (user.companies) {
      a = {...a, companyIds: user.companies.map(company => company.id)};
    }
    return a;
  }

  private daoToDto(user: UserDao): User {
    let companies: Array<Company>;
    if (user.companyIds) {
      const companyDaos: Array<CompanyDao> = getCompaniesByCompanyIds(user.companyIds);
      companies = companyDaos.map(company => {
        const userDaos: Array<UserDao> = getUsersByIds(company.users);
        const users: Array<User> = userDaos.map(user => {
          return {...user} as User;
        })
        return {...company, users};
      })
    }
    if (companies) {
      return {...user, companies};
    }
    return {...user} as User;
  }

}
