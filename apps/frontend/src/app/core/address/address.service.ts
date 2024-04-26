import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { CoreEntityCollectionServiceBase } from '../ngrx-data-adapter-config/core-entity-collection-service-base';
import { Address } from '@ngrx-data-adapter/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddressService extends CoreEntityCollectionServiceBase<Address> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Address', serviceElementsFactory);
  }
  getAllAddresses(): Observable<Array<Address>> {
    return super.getAll()
  }
  getAddressByKey(key: number): Observable<Address> {
    return super.getByKey(key)
  }
}
