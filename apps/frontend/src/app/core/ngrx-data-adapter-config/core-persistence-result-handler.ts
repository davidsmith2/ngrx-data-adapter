import { DefaultPersistenceResultHandler, EntityAction, EntityOp } from "@ngrx/data";
import { Action } from "@ngrx/store";
import { environment } from "apps/frontend/src/environments/environment";

export class CorePersistenceResultHandler extends DefaultPersistenceResultHandler {
  handleSuccess(originalAction: EntityAction): (data: any) => Action {
    const actionHandler = super.handleSuccess(originalAction);
    // return a factory to get a data handler to
    // parse data from DataService and save to action.payload
    return function(data: any) {
      const action = actionHandler.call(this, data);
      if (
        environment.apiRoot === 'rest' &&
        action &&
        data &&
        action.payload.entityOp === EntityOp.QUERY_MANY_SUCCESS && action.payload.entityName === 'User') {
        (action as any).payload.meta = data.meta;
        (action as any).payload.data = data.data;
      }
      return action;
    };
  }
}