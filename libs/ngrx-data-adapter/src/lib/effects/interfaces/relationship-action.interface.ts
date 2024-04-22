import { ENTITY_SELECTOR, ngrxEntityRelationshipActions } from "ngrx-entity-relationship";

export interface RelationshipAction {
  data: any;
  selector: ENTITY_SELECTOR<any, any>;
  type: ngrxEntityRelationshipActions;
};