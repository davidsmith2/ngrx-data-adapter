import { Injectable } from "@angular/core";
import { CoreEntityCollectionServiceBase } from "../ngrx-data-adapter-config/core-entity-collection-service-base";
import { EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Permission } from "libs/api-interfaces/src/lib/permission/permission.interface";

@Injectable({ providedIn: 'root' })
export class PermissionService extends CoreEntityCollectionServiceBase<Permission> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Permission', serviceElementsFactory);
  }
}
