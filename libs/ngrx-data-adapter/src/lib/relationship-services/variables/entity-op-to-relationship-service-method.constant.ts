import { EntityOp } from "@ngrx/data";
import { RelationshipServiceMethod } from "../enumerations/relationship-service-method.enum";

export const ENTITY_OP_TO_RELATIONSHIP_SERVICE_METHOD: Map<EntityOp, RelationshipServiceMethod> = new Map(
  [
    [EntityOp.SAVE_ADD_ONE, RelationshipServiceMethod.AddOne],
    [EntityOp.SAVE_DELETE_ONE, RelationshipServiceMethod.DeleteOne],
    [EntityOp.QUERY_ALL, RelationshipServiceMethod.SelectAll],
    [EntityOp.QUERY_MANY, RelationshipServiceMethod.SelectAll],
    [EntityOp.QUERY_BY_KEY, RelationshipServiceMethod.SelectOne],
    [EntityOp.SAVE_UPDATE_ONE, RelationshipServiceMethod.UpdateOne],
    [EntityOp.SAVE_UPSERT_ONE, RelationshipServiceMethod.UpsertOne]
  ]
);
