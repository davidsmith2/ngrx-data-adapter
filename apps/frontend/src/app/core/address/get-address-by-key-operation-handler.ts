import { Address } from '@ngrx-data-adapter/api-interfaces';
import { GetByKeyOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';
import { HttpMethods } from '@ngrx/data';

export class GetAddressByKeyOperationHandler<Company> extends GetByKeyOperationHandler<Address> {
  matchRequest(_url: string, _method: HttpMethods): boolean {
    throw new Error('Method not implemented.');
  }
  modifyRequest(_request: string): string {
    throw new Error('Method not implemented.');
  }
  modifyResponse(_response: unknown): Address {
    throw new Error('Method not implemented.');
  }
}