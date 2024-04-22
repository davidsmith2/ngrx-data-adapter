import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { CoreEntityCollectionServiceBase } from '../ngrx-data-adapter-config/core-entity-collection-service-base';
import { Address } from '@ngrx-data-adapter/api-interfaces';

@Injectable({ providedIn: 'root' })
export class AddressService extends CoreEntityCollectionServiceBase<Address> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Address', serviceElementsFactory);
  }
}
