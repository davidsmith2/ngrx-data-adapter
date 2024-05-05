import { UpdateOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';

export class UpdateUserOperationHandler<User> extends UpdateOperationHandler<User> {
  modifyRequest(request: User): unknown {
    console.log('UpdateUserOperationHandler#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): User {
    console.log('UpdateUserOperationHandler#modifyResponse');
    return response as User;
  }
}