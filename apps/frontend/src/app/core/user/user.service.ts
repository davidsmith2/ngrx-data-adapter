import { Injectable } from '@angular/core';
import { User } from '@ngrx-data-adapter/api-interfaces';
import {
  EntityActionOptions,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { CoreEntityCollectionServiceBase } from '../ngrx-data-adapter-config/core-entity-collection-service-base';

@Injectable({ providedIn: 'root' })
export class UserService extends CoreEntityCollectionServiceBase<User> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }

  getAllUsers(options?: EntityActionOptions): Observable<User[]> {
    return super.getAll(options);
  }

  getUserByKey(key: number, options?: EntityActionOptions): Observable<User> {
    return super.getByKey(key, options);
  }

  getUsersWithQuery(firstName: string, options?: EntityActionOptions): Observable<User[]> {
    return super.getWithQuery({firstName}, options);
  }

  createUser(entity: User, options?: EntityActionOptions): Observable<User> {
    return super.add(entity, {...options, isOptimistic: false});
  }

  updateUser(entity: Partial<User>, options?: EntityActionOptions): Observable<User> {
    return super.update(entity, options);
  }

  deleteUser(key: number, options?: EntityActionOptions): Observable<string|number> {
    return super.delete(key, options);
  }

  upsertUser(entity: User, options?: EntityActionOptions): Observable<User> {
    return super.upsert(entity, options);
  }
}
