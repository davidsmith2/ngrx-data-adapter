import { EntityAction } from "@ngrx/data";
import { PERSIST_SUCCESS_ACTION_TYPE } from "../variables/persist-success-action-type.constant";

export class PersistSuccessAction {
  type: string = PERSIST_SUCCESS_ACTION_TYPE;
  payload: EntityAction;
  constructor(entityAction: EntityAction) {
    this.payload = entityAction;
  }
}
