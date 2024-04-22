import { EntityMetadata } from "@ngrx/data";
import { AdapterEntityConfig } from "./adapter-entity-config.interface";

export interface AdapterEntityMetadata<T> extends EntityMetadata<T> {
  adapter?: AdapterEntityConfig;
}