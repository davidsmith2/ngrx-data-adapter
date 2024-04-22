import { EntityOp } from "@ngrx/data";
import { DataServiceMethod } from "../enumerations/data-service-method.enum";

export const DATA_SERVICE_METHOD_TO_ENTITY_OP: Map<DataServiceMethod, EntityOp> = new Map(
  [
    [DataServiceMethod.Add, EntityOp.SAVE_ADD_ONE],
    [DataServiceMethod.Delete, EntityOp.SAVE_DELETE_ONE],
    [DataServiceMethod.GetAll, EntityOp.QUERY_ALL],
    [DataServiceMethod.GetById, EntityOp.QUERY_BY_KEY],
    [DataServiceMethod.GetWithQuery, EntityOp.QUERY_MANY],
    [DataServiceMethod.Update, EntityOp.SAVE_UPDATE_ONE],
    [DataServiceMethod.Upsert, EntityOp.SAVE_UPSERT_ONE]
  ]
);
