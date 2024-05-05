import { GetWithQueryOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';
import { QueryParams } from '@ngrx/data';

export class GetUsersWithQueryOperationHandler<User> extends GetWithQueryOperationHandler<User> {
  modifyRequest(request: string): string {
    console.log('GetUsersWithQueryOperationHandler#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): Array<User> {
    console.log('GetUsersWithQueryOperationHandler#modifyResponse');
    return response as Array<User>;
  }
}
