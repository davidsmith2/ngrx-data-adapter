import { Inject, Injectable } from "@angular/core";
import { ENTITY_METADATA_TOKEN, EntityAction, EntityActionFactory, EntityActionPayload, EntityCacheQuerySet, EntityDataService, EntityEffects, EntityMetadataMap, EntityOp, MergeQuerySet, MergeStrategy, PersistenceResultHandler, flattenArgs, ofEntityOp, ofEntityType, persistOps } from "@ngrx/data";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { filter, map, mergeMap } from "rxjs/operators";
import { ENTITY_SELECTOR } from "ngrx-entity-relationship";
import { DataNormalizationService } from "../../utils/classes/data-normalization.service";
import { AdapterOperationConfig } from "../../entity-metadata/interfaces/adapter-operation-config.interface";
import { AdapterRelationshipConfig } from "../../entity-metadata/interfaces/adapter-relationship-config.interface";
import { ENTITY_OP_TO_DATA_SERVICE_METHOD } from "../../dataservices/variables/entity-op-to-data-service-method.constant";
import { PersistSuccessAction } from "./persist-success-action";
import { PERSIST_SUCCESS_ACTION_TYPE } from "../variables/persist-success-action-type.constant";
import { RelationshipAction } from "../interfaces/relationship-action.interface";
import { ADAPTER_RELATIONSHIP_SERVICES_TOKEN } from "../../utils/variables/adapter-relationship-services-token.constant";
import { AdapterEntityMetadata } from "../../entity-metadata/interfaces/adapter-entity-metadata.interface";
import { ENTITY_OP_TO_RELATIONSHIP_SERVICE_METHOD } from "../../relationship-services/variables/entity-op-to-relationship-service-method.constant";
import { ROOT_EFFECTS_INIT } from "../../adapter_root_module";

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

  initializeEntityCache$: Observable<Action> = createEffect(() => {
    return this.myActions.pipe(
      ofType(ROOT_EFFECTS_INIT),
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
  
  persist$: Observable<Action> = createEffect(() => {
    return this.myActions.pipe(
      ofEntityOp(persistOps),
      mergeMap((entityActionIn: EntityAction) => this.persist(entityActionIn)),
      map((entityActionOut: EntityAction) => new PersistSuccessAction(entityActionOut))
    );
  });

  success$: Observable<EntityAction> = createEffect(() => {
    return this.myActions.pipe(
      ofType(PERSIST_SUCCESS_ACTION_TYPE),
      map((action: any) => action.payload)
    );
  });

  queryManySuccess$: Observable<EntityAction> = createEffect(() => {
    return this.myActions.pipe(
      ofType(PERSIST_SUCCESS_ACTION_TYPE),
      filter((action: any) => action.payload.payload.entityOp === EntityOp.QUERY_MANY_SUCCESS),
      map((action: any) => this.createRemoveAllAction(action.payload))
    );
  });

  relationshipSuccess$: Observable<RelationshipAction> = createEffect(() => {
    return this.myActions.pipe(
      ofType(PERSIST_SUCCESS_ACTION_TYPE),
      filter((action: any) => action.payload.payload.entityOp !== EntityOp.SAVE_DELETE_ONE_SUCCESS),
      map((action: any) => this.createRelationshipAction(action.payload))
    );
  });

  private createRemoveAllAction(entityAction: EntityAction): EntityAction {
    return this.myEntityActionFactory.create(entityAction.payload.entityName, EntityOp.REMOVE_ALL);
  }

  private createRelationshipAction(entityAction: EntityAction): RelationshipAction {
    const { entityName, entityOp }: EntityActionPayload = entityAction.payload;
    console.debug('entityName', entityName)
    console.debug('entityOp', entityOp)
    const successOp: EntityOp = entityOp.replace('/success', '') as EntityOp;
    console.debug('successOp', successOp)
    const selector: ENTITY_SELECTOR = this.relationshipServices[entityName][ENTITY_OP_TO_RELATIONSHIP_SERVICE_METHOD.get(successOp)];
    console.debug('selector', selector)
    if (selector) {
      const relationshipAction: RelationshipAction = this.dataNormalizationService.reduceGraph({
        data: entityAction.payload.data,
        selector
      });
      console.debug('relationshipAction', relationshipAction)
      return relationshipAction;
    }
    return null;
  }

}