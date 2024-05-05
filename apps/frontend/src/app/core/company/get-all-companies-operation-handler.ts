import { GetAllOperationHandler } from '@ngrx-data-adapter/ngrx-data-adapter';

export class GetAllCompaniesOperationHandler<Company> extends GetAllOperationHandler<Company> {
  modifyRequest(_request: string): string {
    throw new Error('Method not implemented.');
  }
  modifyResponse(_response: unknown): Array<Company> {
    throw new Error('Method not implemented.');
  }
}