import { GetAllOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';
import { HttpMethods } from '@ngrx/data';

export class GetAllUsersOperationHandler<User> extends GetAllOperationHandler<User> {
  matchRequest(_url: string, _method: HttpMethods): boolean {
    throw new Error('Method not implemented.');
  }
  modifyRequest(_request: string): string {
    throw new Error('Method not implemented.');
  }
  modifyResponse(_response: unknown): Array<User> {
    throw new Error('Method not implemented.');
  }
}