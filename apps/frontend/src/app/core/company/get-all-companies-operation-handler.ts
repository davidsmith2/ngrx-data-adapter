import { GetAllOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';
import { HttpMethods } from '@ngrx/data';

export class GetAllCompaniesOperationHandler<Company> extends GetAllOperationHandler<Company> {
  matchRequest(_url: string, _method: HttpMethods): boolean {
    throw new Error('Method not implemented.');
  }
  modifyRequest(_request: string): string {
    throw new Error('Method not implemented.');
  }
  modifyResponse(_response: unknown): Array<Company> {
    throw new Error('Method not implemented.');
  }
}