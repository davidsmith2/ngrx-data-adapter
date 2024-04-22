import { DefaultDataServiceConfig } from "@ngrx/data";
import { environment } from "apps/frontend/src/environments/environment";

export const CORE_DATA_SERVICE_CONFIG: DefaultDataServiceConfig = {
  root: environment.apiRoot,
};
