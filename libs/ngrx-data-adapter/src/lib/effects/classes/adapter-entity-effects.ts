import { Inject, Injectable } from "@angular/core";
import { EntityAction, EntityActionFactory, EntityActionPayload, EntityDataService, EntityEffects, EntityOp, MergeQuerySet, PersistenceResultHandler, ofEntityOp, persistOps } from "@ngrx/data";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { filter, map, mergeMap } from "rxjs/operators";
import { ENTITY_SELECTOR } from "ngrx-entity-relationship";
import { DataNormalizationService } from "../../utils/classes/data-normalization.service";
import { RelationshipAction } from "../interfaces/relationship-action.interface";
import { ADAPTER_RELATIONSHIP_SERVICES_TOKEN } from "../../utils/variables/adapter-relationship-services-token.constant";
import { ENTITY_OP_TO_RELATIONSHIP_SERVICE_METHOD } from "../../relationship-services/variables/entity-op-to-relationship-service-method.constant";
import { AdapterActionTypes } from "../variables/adapter-action-types.enum";
import { persistSuccess } from "../variables/adapter-actions.constants";

@Injectable()
export class AdapterEntityEffects extends EntityEffects {
  constructor(
    private myActions: Actions<EntityAction>,
    private myDataService: EntityDataService,
    private myEntityActionFactory: EntityActionFactory,
    private myResultHandler: PersistenceResultHandler,
    private dataNormalizationService: DataNormalizationService,
    @Inject(ADAPTER_RELATIONSHIP_SERVICES_TOKEN) private relationshipServices: any
  ) {
    super(myActions, myDataService, myEntityActionFactory, myResultHandler, null);
  }

  persist$: Observable<Action> = createEffect(() => {
    return this.myActions.pipe(
      ofEntityOp(persistOps),
      mergeMap((entityActionIn: EntityAction) => this.persist(entityActionIn)),
      map((entityActionOut: EntityAction) => persistSuccess({payload: entityActionOut}))
    );
  });

  onInitializeEntityCache$: Observable<Action> = createEffect(() => {
    return this.myActions.pipe(
      ofType(AdapterActionTypes.INITIALIZE_ENTITY_CACHE),
      map((action: {type: string, payload: Array<string>}) => {
        const entityCacheQuerySet = {};
        action.payload.forEach((entityCacheKey: string) => {
          entityCacheQuerySet[entityCacheKey] = [];
        });
        const mergeQuerySet: MergeQuerySet = new MergeQuerySet(entityCacheQuerySet);
        return mergeQuerySet;
      })
    );
  });

  handleDefaultPersistSuccess$: Observable<EntityAction> = createEffect(() => {
    return this.myActions.pipe(
      ofType(AdapterActionTypes.PERSIST_SUCCESS),
      map((action: any) => action.payload)
    );
  });

  handleQueryManyPersistSuccess$: Observable<EntityAction> = createEffect(() => {
    return this.myActions.pipe(
      ofType(AdapterActionTypes.PERSIST_SUCCESS),
      filter((action: any) => action.payload.payload.entityOp === EntityOp.QUERY_MANY_SUCCESS),
      map((action: any) => this.myEntityActionFactory.create(action.payload.payload.entityName, EntityOp.REMOVE_ALL))
    );
  });

  handleRelationalPersistSuccess$: Observable<RelationshipAction> = createEffect(() => {
    return this.myActions.pipe(
      ofType(AdapterActionTypes.PERSIST_SUCCESS),
      filter((action: any) => action.payload.payload.entityOp !== EntityOp.SAVE_DELETE_ONE_SUCCESS),
      map((action: any) => {
        const { entityName, entityOp }: EntityActionPayload = action.payload.payload;
        const successOp: EntityOp = entityOp.replace('/success', '') as EntityOp;
        const selector: ENTITY_SELECTOR = this.relationshipServices[entityName][ENTITY_OP_TO_RELATIONSHIP_SERVICE_METHOD.get(successOp)];
        return [selector, action.payload.payload.data];
      }),
      filter(([selector, _data]: [ENTITY_SELECTOR, any]) => !!selector),
      map(([selector, data]: [ENTITY_SELECTOR, any]) => this.dataNormalizationService.reduceGraph({data, selector}))
    );
  });

}