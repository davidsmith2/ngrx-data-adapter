import { Company } from '@ngrx-data-adapter/api-interfaces';
import { GetByKeyOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';
import { HttpMethods } from '@ngrx/data';

export class GetUserByKeyRequestHandler<User> extends GetByKeyOperationHandler<User> {
  matchRequest(_url: string, _method: HttpMethods): boolean {
    throw new Error('Method not implemented.');
  }
  modifyRequest(_request: string): string {
    throw new Error('Method not implemented.');
  }
  modifyResponse(_response: unknown): User {
    throw new Error('Method not implemented.');
  }
 }