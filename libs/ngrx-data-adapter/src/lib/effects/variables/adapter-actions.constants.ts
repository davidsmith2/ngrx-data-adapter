import { createAction, props } from "@ngrx/store";
import { AdapterActionTypes } from "./adapter-action-types.enum";
import { EntityAction } from "@ngrx/data";

export const initializeEntityCache = createAction(
  AdapterActionTypes.INITIALIZE_ENTITY_CACHE
);

export const persistSuccess = createAction(
  AdapterActionTypes.PERSIST_SUCCESS,
  props<{ payload: EntityAction }>()
);
