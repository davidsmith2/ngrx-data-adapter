import { GetByKeyOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';

export class GetUserByKeyRequestHandler<User> extends GetByKeyOperationHandler<User> {
  modifyRequest(request: string): string {
    console.log('GetUserByKeyRequestHandler#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): User {
    console.log('GetUserByKeyRequestHandler#modifyResponse');
    return response as User;
  }
}