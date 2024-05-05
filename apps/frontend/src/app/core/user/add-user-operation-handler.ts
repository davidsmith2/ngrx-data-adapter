import { AddOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';

export class AddUserOperationHandler<User> extends AddOperationHandler<User> {
  modifyRequest(request: User): unknown {
    console.log('AddUserOperationHandler#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): User {
    console.log('AddUserOperationHandler#modifyResponse');
    return response as User;
  }
}