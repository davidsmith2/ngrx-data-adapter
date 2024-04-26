import { Injectable } from '@angular/core';
import { rootEntity, rootEntities, childEntity } from 'ngrx-entity-relationship';
import { AddressService } from '../address/address.service';
import { DefaultRelationshipService } from '@ngrx-data-adapter/ngrx-data-adapter';
import { Address } from '@ngrx-data-adapter/api-interfaces';
import { CompanyService } from '../company/company.service';

@Injectable({
  providedIn: 'root',
})
export class AddressRelationshipService implements DefaultRelationshipService<Address> {
  public readonly selectOne = rootEntity(
    this.addressService,
    {
      gqlFields: ['id', 'street', 'city', 'country']
    },
    childEntity(
      this.companyService,
      'addressId',
      'company',
      {
        gqlFields: ['id', 'name']
      }
    )
  );
  public readonly selectAll = rootEntities(this.selectOne);
  constructor(
    private addressService: AddressService,
    private companyService: CompanyService
  ) { }
}
