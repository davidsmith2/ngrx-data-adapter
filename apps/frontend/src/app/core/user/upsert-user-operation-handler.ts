import { UpsertOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';

export class UpsertUserOperationHandler<User> extends UpsertOperationHandler<User> {
  modifyRequest(request: User): unknown {
    console.log('UpsertUserOperationHandler#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): User {
    console.log('UpsertUserOperationHandler#modifyResponse');
    return response as User;
  }
}