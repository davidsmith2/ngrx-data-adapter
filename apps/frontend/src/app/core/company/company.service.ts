import { Injectable } from '@angular/core';
import { Company } from '@ngrx-data-adapter/api-interfaces';
import {
  EntityActionOptions,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { CoreEntityCollectionServiceBase } from '../ngrx-data-adapter-config/core-entity-collection-service-base';

@Injectable({ providedIn: 'root' })
export class CompanyService extends CoreEntityCollectionServiceBase<Company> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Company', serviceElementsFactory);
  }

  getAllCompanies(options?: EntityActionOptions): Observable<Company[]> {
    return super.getAll(options);
  }

  getCompanyByKey(key: number, options?: EntityActionOptions): Observable<Company> {
    return super.getByKey(key, options);
  }

}
