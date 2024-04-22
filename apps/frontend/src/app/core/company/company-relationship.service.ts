import { Injectable } from '@angular/core';
import { rootEntity, rootEntities, relatedEntity, childrenEntities } from 'ngrx-entity-relationship';
import { CompanyService } from './company.service';
import { AddressService } from '../address/address.service';
import { DefaultRelationshipService } from '@ngrx-data-adapter/ngrx-data-adapter';
import { Company } from '@ngrx-data-adapter/api-interfaces';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyRelationshipService implements DefaultRelationshipService<Company> {
  private readonly companyMaster = rootEntity(
    this.companyService,
    {
      gqlFields: {
        id: '',
        name: ''
      }
    }
  );

  private readonly companyDetail = rootEntity(
    this.companyService,
    {
      gqlFields: ['id', 'name']
    },
    relatedEntity(
      this.addressService,
      'addressId',
      'address',
      {
        gqlFields: ['id', 'street', 'city', 'country']
      }
    ),
    childrenEntities(
      this.userService,
      'id',
      'users',
      {
        gqlFields: ['id', 'firstName', 'lastName']
      }
    )
  );

  public readonly selectOne = this.companyDetail;

  public readonly selectAll = rootEntities(this.companyMaster);

  constructor(
    private companyService: CompanyService,
    private addressService: AddressService,
    private userService: UserService
  ) { }

}
