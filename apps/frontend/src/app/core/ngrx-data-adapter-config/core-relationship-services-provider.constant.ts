import { Provider } from "@angular/core";
import { UserRelationshipService } from "../user/user-relationship.service";
import { CompanyRelationshipService } from "../company/company-relationship.service";
import { ADAPTER_RELATIONSHIP_SERVICES_TOKEN } from "@ngrx-data-adapter/ngrx-data-adapter";
import { AddressRelationshipService } from "../address/address-relationship.service";

export const CoreRelationshipServicesProvider: Provider = {
  provide: ADAPTER_RELATIONSHIP_SERVICES_TOKEN,
  useFactory: (
    userRelationshipService: UserRelationshipService,
    companyRelationshipService: CompanyRelationshipService,
    addressRelationshipService: AddressRelationshipService
  ) => {
    return {
      User: userRelationshipService,
      Company: companyRelationshipService,
      Address: addressRelationshipService
    };
  },
  deps: [
    UserRelationshipService,
    CompanyRelationshipService,
    AddressRelationshipService
  ]
};
