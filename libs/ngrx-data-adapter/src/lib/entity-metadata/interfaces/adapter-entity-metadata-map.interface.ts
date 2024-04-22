import { EntityMetadataMap } from "@ngrx/data";
import { AdapterEntityMetadata } from "./adapter-entity-metadata.interface";

export interface AdapterEntityMetadataMap extends EntityMetadataMap {
  [entityName: string]: Partial<AdapterEntityMetadata<any>>;
}