import { Inject, NgModule } from "@angular/core";
import { ENTITY_METADATA_TOKEN, EntityMetadataMap } from "@ngrx/data";
import { Store } from "@ngrx/store";
import { AdapterActionTypes } from "./effects/variables/adapter-action-types.enum";

@NgModule({})
export class AdapterRootModule {
  constructor(
    @Inject(ENTITY_METADATA_TOKEN) private entityMetadataMaps: Array<EntityMetadataMap>,
    store: Store<any>
  ) {
    store.dispatch({
      type: AdapterActionTypes.INITIALIZE_ENTITY_CACHE,
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
