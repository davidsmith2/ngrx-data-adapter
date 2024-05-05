import { GetByKeyOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';

export class GetCompanyByKeyOperationHandler<Company> extends GetByKeyOperationHandler<Company> {
  modifyRequest(_request: string): string {
    throw new Error('Method not implemented.');
  }
  modifyResponse(_response: unknown): Company {
    throw new Error('Method not implemented.');
  }
}