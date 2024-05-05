import { DeleteOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';

export class DeleteUserOperationHandler<User> extends DeleteOperationHandler<User> {
  modifyRequest(request: string): string {
    console.log('DeleteUserOperationHandler#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): string|number {
    console.log('DeleteUserOperationHandler#modifyResponse');
    return response as string|number;
  }
}