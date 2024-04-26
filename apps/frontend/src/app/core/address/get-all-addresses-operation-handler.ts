import { Address } from '@ngrx-data-adapter/api-interfaces';
import { GetAllOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';
import { HttpMethods } from '@ngrx/data';

export class GetAllAddressesOperationHandler<Address> extends GetAllOperationHandler<Address> {
  matchRequest(_url: string, _method: HttpMethods): boolean {
    throw new Error('Method not implemented.');
  }
  modifyRequest(_request: string): string {
    throw new Error('Method not implemented.');
  }
  modifyResponse(_response: unknown): Array<Address> {
    throw new Error('Method not implemented.');
  }
}