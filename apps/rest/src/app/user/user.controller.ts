import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@ngrx-data-adapter/api-interfaces';
import { UserDao } from './user.dao';
import { PermissionService } from '../permission/permission.service';
import { UserMapper } from './user.mapper';

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
  getMany(@Query() query: any): Array<User> {
    const firstName: string = query.firstName;
    let userDaos: Array<UserDao>;
    if (firstName) {
      userDaos = this.userService.getWithQuery(firstName);
    } else {
      userDaos = this.userService.getAll();
    }
    return userDaos.map((userDao: UserDao) => this.userMapper.mapDaoToDto(userDao));
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
