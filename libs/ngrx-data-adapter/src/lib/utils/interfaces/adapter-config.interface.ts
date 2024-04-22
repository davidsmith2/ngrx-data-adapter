import { AdapterEntityConfig } from "../../entity-metadata/interfaces/adapter-entity-config.interface";

/**
 * @deprecated
 */
export interface AdapterConfig {
  [entityName: string]: Partial<AdapterEntityConfig>;
}
