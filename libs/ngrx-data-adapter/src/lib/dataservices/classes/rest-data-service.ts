import { DefaultDataService } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { Observable, of } from "rxjs";
import { DATA_SERVICE_METHOD_TO_ENTITY_OP } from "../variables/data-service-method-to-entity-op.constant";
import { DataServiceMethod } from "../enumerations/data-service-method.enum";
import { AdapterEntityMetadata } from "../../entity-metadata/interfaces/adapter-entity-metadata.interface";
import { AdapterOperationConfig } from "../../entity-metadata/interfaces/adapter-operation-config.interface";
import { OperationHandler } from "./operation-handler";
import { AdapterEntityMetadataMap } from "../../entity-metadata/interfaces/adapter-entity-metadata-map.interface";

export class RestDataService<T> extends DefaultDataService<T> {
  public entityMetadataMap: AdapterEntityMetadataMap;

  add(entity: T): Observable<T> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.Add));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Add];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    return super.add(entity);
  }

  delete(key: string | number): Observable<string | number> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.Delete));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Delete];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    return super.delete(key);
  }

  getAll(): Observable<T[]> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.GetAll));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.GetAll];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    if (proxy) {
      try {
        proxy.matchRequest(null, null);
      } catch (error) {
        console.warn(error);
      }
    }
    return super.getAll();
  }

  getById(key: string | number): Observable<T> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.GetById));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.GetById];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    if (proxy) {
      try {
        proxy.matchRequest(null, null);
      } catch (error) {
        console.warn(error);
      }
    }
    return super.getById(key);
  }

  getWithQuery(query: string): Observable<T[]> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.GetWithQuery));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.GetWithQuery];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    return super.getWithQuery(query);
  }

  update(update: Update<T>): Observable<T> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.Update));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Update];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    return super.update(update);
  }
  
  upsert(entity: T): Observable<T> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.Upsert));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Upsert];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    return super.upsert(entity);
  }
}
