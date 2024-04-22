import { EntityOp } from "@ngrx/data";
import { DataServiceMethod } from "../enumerations/data-service-method.enum";

export const ENTITY_OP_TO_DATA_SERVICE_METHOD: Map<EntityOp, DataServiceMethod> = new Map(
  [
    [EntityOp.SAVE_ADD_ONE, DataServiceMethod.Add],
    [EntityOp.SAVE_DELETE_ONE, DataServiceMethod.Delete],
    [EntityOp.QUERY_ALL, DataServiceMethod.GetAll],
    [EntityOp.QUERY_BY_KEY, DataServiceMethod.GetById],
    [EntityOp.QUERY_MANY, DataServiceMethod.GetWithQuery],
    [EntityOp.SAVE_UPDATE_ONE, DataServiceMethod.Update],
    [EntityOp.SAVE_UPSERT_ONE, DataServiceMethod.Upsert]
  ]
);
