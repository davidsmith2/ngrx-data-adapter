import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@ngrx-data-adapter/api-interfaces';
import { UserDao } from './user.dao';
import { UserMapper } from './user.mapper';

interface PagerRequest {
  page: number;
  limit: number;
}  

interface PagerResponse<T> {
  data: Array<T>;
  meta: {
    total: number;
    pages: number;
    limit: number;
    page: number
  }
}


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper<UserDao, User>
  ) {}

  @Post()
  add(@Body() user: User): User {
    let userDao: UserDao = this.userMapper.mapDtoToDao(user);
    userDao = this.userService.add(userDao);
    return this.userMapper.mapDaoToDto(userDao);
  }

  @Delete(':id')
  delete(@Param('id') id: number): User {
    const userDao: UserDao = this.userService.delete(+id);
    return this.userMapper.mapDaoToDto(userDao);
  }

  @Get(':id')
  getByKey(@Param('id') id: number): User {
    const userDao: UserDao = this.userService.getByKey(+id);
    return this.userMapper.mapDaoToDto(userDao);
  }

  @Get()
  getMany(@Query() query: {firstName: string}|PagerRequest): Array<User>|PagerResponse<User> {
    let userDaos: Array<UserDao>;
    if (query.hasOwnProperty('firstName')) {
      userDaos = this.userService.getWithQuery((<{firstName: string}>query).firstName);
    } else {
      userDaos = this.userService.getAll();
    }
    if (query.hasOwnProperty('page') && query.hasOwnProperty('limit')) {
      const {page, limit}: PagerRequest = query as PagerRequest;
      const userDaos: Array<UserDao> = this.userService.getAll();
      const limitedUserDaos: number = Math.ceil(userDaos.length / +limit);
      const pagedUserDaos: Array<UserDao> = userDaos.slice((+page - 1) * +limit, +page * +limit);
      return {
        data: pagedUserDaos.map((userDao: UserDao) => this.userMapper.mapDaoToDto(userDao)),
        meta: {
          total: userDaos.length,
          pages: limitedUserDaos,
          limit: +limit,
          page: +page
        }
      };
    } else {
      return userDaos.map((userDao: UserDao) => this.userMapper.mapDaoToDto(userDao));
    }
  }

  @Put()
  update(@Body() user: Partial<User>): User {
    let userDao: UserDao = this.userMapper.mapDtoToDao(user as User);
    userDao = this.userService.update({...user, id: +user.id});
    return this.userMapper.mapDaoToDto(userDao);
  }

  @Put(':id')
  upsert(@Param('id') id: number, @Body() user: User): User {
    let userDao: UserDao = this.userMapper.mapDtoToDao(user);
    userDao = this.userService.upsert(+id, user);
    return this.userMapper.mapDaoToDto(userDao);
  }

}
