import { Injectable } from '@angular/core';
import { rootEntity, relatedEntity, rootEntities, childEntity } from 'ngrx-entity-relationship';
import { CompanyService } from '../company/company.service';
import { User } from '@ngrx-data-adapter/api-interfaces';
import { UserService } from './user.service';
import { UserViewModel } from './user-view-model';
import { DefaultRelationshipService } from '@ngrx-data-adapter/ngrx-data-adapter';
import { PermissionService } from '../permission/permission.service';

@Injectable({
  providedIn: 'root',
})
export class UserRelationshipService implements DefaultRelationshipService<User> {
  private readonly userSummaryGqlFields = ['id', 'firstName', 'lastName'];

  private readonly userMaster = rootEntity(
    this.userService,
    (user: User) => new UserViewModel(user),
    {
      gqlFields: this.userSummaryGqlFields
    }
  );

  private readonly userDetail = rootEntity(
    this.userService,
    (user: User) => new UserViewModel(user),
    {
      gqlFields: {
        id: '',
        firstName: '',
        lastName: ''
      }
    },
    relatedEntity(this.companyService, 'companyIds', 'companies', {
      gqlFields: ['id', 'name']
    }),
    childEntity(this.permissionService, 'userId', 'permission', {
      gqlFields: ['id', 'level', 'description']
    })
  );

  private readonly createMutation = (gqlFields) => {
    return rootEntity(
      this.userService,
      (user: User) => new UserViewModel(user),
      {gqlFields}
    )
  } 

  public readonly selectAll = rootEntities(this.userMaster);

  public readonly selectOne = this.userDetail;

  public readonly addOne = this.createMutation(this.userSummaryGqlFields);

  public readonly updateOne = this.createMutation(this.userSummaryGqlFields);

  public readonly upsertOne = this.createMutation(this.userSummaryGqlFields);

  public readonly deleteOne = this.createMutation({id: ''});

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private permissionService: PermissionService
  ) { }

}
