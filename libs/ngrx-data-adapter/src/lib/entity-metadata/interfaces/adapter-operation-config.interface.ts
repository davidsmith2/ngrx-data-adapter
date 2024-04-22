import { OperationHandler } from "../../dataservices/classes/operation-handler";
import { AdapterRelationshipConfig } from "./adapter-relationship-config.interface";

export interface AdapterOperationConfig {
  proxy: OperationHandler<unknown>;
  relationship: AdapterRelationshipConfig;
}
