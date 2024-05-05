import { Provider } from '@angular/core';
import { ENTITY_METADATA_TOKEN } from '@ngrx/data';
import { GetAllUsersOperationHandler } from '../user/get-all-users-operation-handler';
import { GetUserByKeyRequestHandler } from '../user/get-user-by-key-operation-handler';
import { GetUsersWithQueryOperationHandler } from '../user/get-users-with-query-operation-handler';
import { AddUserOperationHandler } from '../user/add-user-operation-handler';
import { GetAllCompaniesOperationHandler } from '../company/get-all-companies-operation-handler';
import { GetCompanyByKeyOperationHandler } from '../company/get-company-by-key-operation-handler';
import { GetAddressByKeyOperationHandler } from '../address/get-address-by-key-operation-handler';
import { GetAllAddressesOperationHandler } from '../address/get-all-addresses-operation-handler';
import { DeleteUserOperationHandler } from '../user/delete-user-operation-handler';
import { UpdateUserOperationHandler } from '../user/update-user-operation-handler';
import { UpsertUserOperationHandler } from '../user/upsert-user-operation-handler';

export const CoreEntityMetadataProvider: Provider = {
  provide: ENTITY_METADATA_TOKEN,
  useValue: [
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
          getAll: {
            proxy: new GetAllUsersOperationHandler(null)
          },
          getById: {
            proxy: new GetUserByKeyRequestHandler(null)
          },
          getWithQuery: {
            proxy: new GetUsersWithQueryOperationHandler(null)
          },
          add: {
            proxy: new AddUserOperationHandler(null)
          },
          update: {
            proxy: new UpdateUserOperationHandler(null)
          },
          delete: {
            proxy: new DeleteUserOperationHandler(null)
          },
          upsert: {
            proxy: new UpsertUserOperationHandler(null)
          }
        }
      },
      Company: {
        adapter: {
          getAll: {
            proxy: new GetAllCompaniesOperationHandler(null)
          },
          getById: {
            proxy: new GetCompanyByKeyOperationHandler(null)
          }
        }
      },
      Address: {
        adapter: {
          getAll: {
            proxy: new GetAllAddressesOperationHandler(null)
          },
          getById: {
            proxy: new GetAddressByKeyOperationHandler(null)
          }
        }
      },
      Permission: {}
    }
  ]
};