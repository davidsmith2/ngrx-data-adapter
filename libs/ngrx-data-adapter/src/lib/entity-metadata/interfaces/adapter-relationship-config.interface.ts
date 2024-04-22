import { ENTITY_SELECTOR } from "ngrx-entity-relationship";

export interface AdapterRelationshipConfig {
  selectorName: string;
  selector?: ENTITY_SELECTOR;
}