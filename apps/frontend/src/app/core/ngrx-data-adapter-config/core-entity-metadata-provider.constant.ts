import { Provider } from '@angular/core';
import { ENTITY_METADATA_TOKEN } from '@ngrx/data';
import { GetAllUsersOperationHandler } from '../user/get-all-users-operation-handler';
import { GetUserByKeyRequestHandler } from '../user/get-user-by-key-operation-handler';
import { AddUserOperationHandler } from '../user/add-user-operation-handler';
import { GetAllCompaniesOperationHandler } from '../company/get-all-companies-operation-handler';
import { GetCompanyByKeyOperationHandler } from '../company/get-company-by-key-operation-handler';
import { GetAddressByKeyOperationHandler } from '../address/get-address-by-key-operation-handler';
import { GetAllAddressesOperationHandler } from '../address/get-all-addresses-operation-handler';

export const CoreEntityMetadataProvider: Provider = {
  provide: ENTITY_METADATA_TOKEN,
  useValue: [
    {
      User: {
        adapter: {
          getAll: {
            proxy: new GetAllUsersOperationHandler(null)
          },
          getById: {
            proxy: new GetUserByKeyRequestHandler(null)
          },
          getWithQuery: {
            proxy: null
          },
          add: {
            proxy: new AddUserOperationHandler(null)
          },
          update: {
            proxy: null
          },
          delete: {
            proxy: null
          },
          upsert: {
            proxy: null
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
      }
    }
  ]
};