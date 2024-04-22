import { Injectable } from '@nestjs/common';
import { User } from '@ngrx-data-adapter/api-interfaces';
import { USER_DATA } from './user.data';
import { UserDao } from './user.dao';

@Injectable()
export class UserService {
  add(user: UserDao): UserDao {
    const userToAdd: UserDao = {...user, id: USER_DATA.length + 1};
    USER_DATA.push(userToAdd);
    return userToAdd;
  }
  delete(id: number): UserDao {
    const userToDelete: User = USER_DATA.find(user => user.id === id) as User;
    const userToDeleteIndex: number = USER_DATA.findIndex(user => user.id === id);
    USER_DATA.splice(userToDeleteIndex, 1);
    return {...userToDelete, id: id};
  }
  getAll(): Array<UserDao> {
    return USER_DATA as Array<User>;
  }
  getByKey(key: number): UserDao {
    return USER_DATA.find(user => user.id === key) as User;
  }
  getWithQuery(firstName: string): Array<UserDao> {
    return USER_DATA.filter(user => user.firstName === firstName) as Array<User>;
  }
  update(user: Partial<UserDao>): UserDao {
    const userToUpdate: User = USER_DATA.find(data => data.id === user.id) as User;
    const userToUpdateIndex: number = USER_DATA.findIndex(data => data.id === user.id);
    const updatedUser: User = {...userToUpdate, ...user};
    USER_DATA.splice(userToUpdateIndex, 1, updatedUser);
    return updatedUser;
  }
  upsert(id: number, user: UserDao): UserDao {
    const userToUpsert: User = USER_DATA.find(data => data.id === id) as User;
    return userToUpsert ? this.update(user) : this.add(user);
  }
}
