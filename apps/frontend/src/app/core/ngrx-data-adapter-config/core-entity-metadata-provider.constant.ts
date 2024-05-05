import { Provider } from '@angular/core';
import { ENTITY_METADATA_TOKEN } from '@ngrx/data';

import { AddUserProxyService } from '../user/add-user-proxy-service';
import { DeleteUserProxyService } from '../user/delete-user-proxy-service';
import { GetAllUsersProxyService } from '../user/get-all-users-proxy-service';
import { GetUserByIdProxyService } from '../user/get-user-by-id-proxy-service';
import { GetUsersWithQueryProxyService } from '../user/get-users-with-query-proxy-service';
import { UpdateUserProxyService } from '../user/update-user-proxy-service';
import { UpsertUserProxyService } from '../user/upsert-user-proxy-service';
import { User } from '@ngrx-data-adapter/api-interfaces';
import { AdapterEntityMetadataMap } from '@ngrx-data-adapter/ngrx-data-adapter';

export const CoreEntityMetadataProvider: Provider = {
  provide: ENTITY_METADATA_TOKEN,
  useFactory: (
    addUserProxyService: AddUserProxyService<User>,
    deleteUserProxyService: DeleteUserProxyService,
    getAllUsersProxyService: GetAllUsersProxyService<User>,
    getUserByIdProxyService: GetUserByIdProxyService<User>,
    getUsersWithQueryProxyService: GetUsersWithQueryProxyService<User>,
    updateUserProxyService: UpdateUserProxyService<User>,
    upsertUserProxyService: UpsertUserProxyService<User>
  ): Array<AdapterEntityMetadataMap> => {
    return [
      {
        User: {
          additionalCollectionState: {
            paginator: {
              total: undefined,
              pages: undefined,
              limit: undefined,
              page: undefined
            }
          },
          adapter: {
            proxyServices: {
              add: addUserProxyService,
              delete: deleteUserProxyService,
              getAll: getAllUsersProxyService,
              getById: getUserByIdProxyService,
              getWithQuery: getUsersWithQueryProxyService,
              update: updateUserProxyService,
              upsert: upsertUserProxyService
            }
          }
        },
        Company: {},
        Address: {},
        Permission: {}
      }
    ]
  },
  deps: [
    AddUserProxyService,
    DeleteUserProxyService,
    GetAllUsersProxyService,
    GetUserByIdProxyService,
    GetUsersWithQueryProxyService,
    UpdateUserProxyService,
    UpsertUserProxyService
  ]
};