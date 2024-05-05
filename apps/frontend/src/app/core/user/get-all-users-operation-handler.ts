import { GetAllOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';

export class GetAllUsersOperationHandler<User> extends GetAllOperationHandler<User> {
  modifyRequest(request: string): string {
    console.log('GetAllUsersOperationHandler#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): Array<User> {
    console.log('GetAllUsersOperationHandler#modifyResponse');
    return response as Array<User>;
  }
}