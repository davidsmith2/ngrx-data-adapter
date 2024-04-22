import { AddOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';
import { HttpMethods } from '@ngrx/data';

export class AddUserOperationHandler<User> extends AddOperationHandler<User> {
  matchRequest(_url: string, _method: HttpMethods): boolean {
    throw new Error('Method not implemented.');
  }
  modifyRequest(_request: User): unknown {
    throw new Error('Method not implemented.');
  }
  modifyResponse(_response: unknown): User {
    throw new Error('Method not implemented.');
  }
}