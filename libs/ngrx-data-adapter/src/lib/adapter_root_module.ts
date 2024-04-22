import { Inject, NgModule } from "@angular/core";
import { ENTITY_METADATA_TOKEN, EntityCacheQuerySet, EntityMetadataMap } from "@ngrx/data";
import { Store, createAction } from "@ngrx/store";

export const ROOT_EFFECTS_INIT = '@ngrx/data-adapter/init';
export const rootEffectsInit = createAction(ROOT_EFFECTS_INIT);

@NgModule({})
export class AdapterRootModule {
  constructor(
    @Inject(ENTITY_METADATA_TOKEN) private entityMetadataMaps: Array<EntityMetadataMap>,
    store: Store<any>
  ) {
    store.dispatch({
      type: ROOT_EFFECTS_INIT,
      payload: this.generateEntityCacheKeys()
    })
  }

  private generateEntityCacheKeys(): Array<string> {
    const entityCacheKeys: Array<string> = [];
    for (let entityCacheKey in this.entityMetadataMaps[0]) {
      entityCacheKeys.push(entityCacheKey);
    }
    return entityCacheKeys;
  }
}
