import { AdapterOperationConfig } from "./adapter-operation-config.interface";

export interface AdapterEntityConfig {
  [operationName: string]: AdapterOperationConfig;
}
  