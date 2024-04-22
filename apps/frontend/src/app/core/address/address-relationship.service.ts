import { Injectable } from '@angular/core';
import { rootEntity, rootEntities } from 'ngrx-entity-relationship';
import { AddressService } from '../address/address.service';
import { DefaultRelationshipService } from '@ngrx-data-adapter/ngrx-data-adapter';
import { Address } from '@ngrx-data-adapter/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AddressRelationshipService implements DefaultRelationshipService<Address> {
  public readonly selectOne = rootEntity(
    this.addressService,
    null,
    {
      gqlFields: {
        id: '',
        street: '',
        city: '',
        state: '',
        zip: '',
      }
    }
  );
  public readonly selectAll = rootEntities(this.selectOne);
  constructor(private addressService: AddressService) { }
}
