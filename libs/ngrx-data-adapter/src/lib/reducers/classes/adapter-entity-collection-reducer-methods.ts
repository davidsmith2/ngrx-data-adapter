import { EntityAction, EntityCollection, EntityCollectionReducerMethodMap, EntityCollectionReducerMethods, EntityOp, HttpUrlGenerator, UpdateResponseData } from "@ngrx/data";

export class AdapterEntityCollectionReducerMethods<T> extends EntityCollectionReducerMethods<T> {

  readonly methods: EntityCollectionReducerMethodMap<T> = {
    [EntityOp.QUERY_ALL_SUCCESS]: this.queryAllSuccess.bind(this),
    [EntityOp.QUERY_BY_KEY_SUCCESS]: this.queryByKeySuccess.bind(this),
    [EntityOp.QUERY_MANY_SUCCESS]: this.queryManySuccess.bind(this),
    [EntityOp.SAVE_ADD_ONE_SUCCESS]: this.saveAddOneSuccess.bind(this),
    [EntityOp.SAVE_DELETE_ONE_SUCCESS]: this.saveDeleteOneSuccess.bind(this),
    [EntityOp.SAVE_UPDATE_ONE_SUCCESS]: this.saveUpdateOneSuccess.bind(this),
    [EntityOp.SAVE_UPSERT_ONE_SUCCESS]: this.saveUpsertOneSuccess.bind(this)
  };

  protected queryAllSuccess(collection: EntityCollection<T>, action: EntityAction<T[]>): EntityCollection<T> {
    return super.queryAllSuccess(collection, action);
  }

  protected queryByKeySuccess(collection: EntityCollection<T>, action: EntityAction<T>): EntityCollection<T> {
    return super.queryByKeySuccess(collection, action);
  }

  protected queryManySuccess(collection: EntityCollection<T>, action: EntityAction<T[]>): EntityCollection<T> {
    return super.queryManySuccess(collection, action);
  }

  protected saveAddOneSuccess(collection: EntityCollection<T>, action: EntityAction<T>): EntityCollection<T> {
    return super.saveAddOneSuccess(collection, action);
  }

  protected saveDeleteOneSuccess(collection: EntityCollection<T>, action: EntityAction<string | number>): EntityCollection<T> {
    return super.saveDeleteOneSuccess(collection, action);
  }

  protected saveUpdateOneSuccess(collection: EntityCollection<T>, action: EntityAction<UpdateResponseData<T>>): EntityCollection<T> {
    return super.saveUpdateOneSuccess(collection, action);
  }

  protected saveUpsertOneSuccess(collection: EntityCollection<T>, action: EntityAction<T>): EntityCollection<T> {
    return super.saveUpsertOneSuccess(collection, action);
  }

}