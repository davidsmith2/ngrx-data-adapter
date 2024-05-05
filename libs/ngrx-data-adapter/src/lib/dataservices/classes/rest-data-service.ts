import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { Observable, iif, of } from "rxjs";
import { DataServiceMethod } from "../enumerations/data-service-method.enum";
import { AdapterEntityMetadata } from "../../entity-metadata/interfaces/adapter-entity-metadata.interface";
import { AdapterOperationConfig } from "../../entity-metadata/interfaces/adapter-operation-config.interface";
import { OperationHandler } from "./operation-handler";
import { AdapterEntityMetadataMap } from "../../entity-metadata/interfaces/adapter-entity-metadata-map.interface";
import { HttpClient } from "@angular/common/http";
import { GetWithQueryOperationHandler } from "./get-with-query-operation-handler";
import { map, switchMap } from "rxjs/operators";
import { GetAllOperationHandler } from "./get-all-operation-handler";
import { GetByKeyOperationHandler } from "./get-by-key-operation-handler";
import { AddOperationHandler } from "./add-operation-handler";
import { DeleteOperationHandler } from "./delete-operation-handler";
import { UpdateOperationHandler } from "./update-operation-handler";

export class RestDataService<T> extends DefaultDataService<T> {
  public entityMetadataMap: AdapterEntityMetadataMap;

  constructor(
    protected entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    protected dataServiceConfig: DefaultDataServiceConfig,
  ) {
    super(entityName, http, httpUrlGenerator, dataServiceConfig);
  }

  add(entity: T): Observable<T> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}`;
    console.debug('url', url)
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Add];
    console.debug('operationConfig', operationConfig)
    const proxy: AddOperationHandler<unknown> = operationConfig.proxy as AddOperationHandler<unknown>;
    console.debug('proxy', proxy)
    return iif(
      () => !!proxy,
      of(entity).pipe(
        map((entity: T) => {
          console.log('modifying request', entity)
          return proxy.modifyRequest(entity);
        }),
        switchMap((data: unknown) => {
          console.log('executing request', url, data)
          return super.execute('POST', url, data);
        }),
        map((response: unknown) => {
          console.log('modifying response', response)
          return proxy.modifyResponse(response) as T;
        })
      ),
      super.add(entity)
    );
  }

  delete(key: string | number): Observable<string | number> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}${key}`;
    console.debug('url', url)
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Delete];
    console.debug('operationConfig', operationConfig)
    const proxy: DeleteOperationHandler<unknown> = operationConfig.proxy as DeleteOperationHandler<unknown>;
    console.debug('proxy', proxy)
    return iif(
      () => !!proxy,
      of(url).pipe(
        map((url: string) => {
          console.log('modifying request', url)
          return proxy.modifyRequest(url);
        }),
        switchMap((url: string) => {
          console.log('executing request', url)
          return super.execute('DELETE', url);
        }),
        map((response: unknown) => {
          console.log('modifying response', response)
          return proxy.modifyResponse(response) as string|number;
        })
      ),
      super.delete(key)
    );
  }

  getAll(): Observable<T[]> {
    const resource: string = this.httpUrlGenerator.collectionResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}`;
    console.debug('url', url)
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.GetAll];
    console.debug('operationConfig', operationConfig)
    const proxy: GetAllOperationHandler<unknown> = operationConfig.proxy as GetAllOperationHandler<unknown>;
    console.debug('proxy', proxy)
    return iif(
      () => !!proxy,
      of(url).pipe(
        map((url: string) => {
          console.log('modifying request', url)
          return proxy.modifyRequest(url);
        }),
        switchMap((url: string) => {
          console.log('executing request', url)
          return super.execute('GET', url);
        }),
        map((response: unknown) => {
          console.log('modifying response', response)
          return proxy.modifyResponse(response) as T[];
        })
      ),
      super.getAll()
    );
  }

  getById(key: string | number): Observable<T> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}${key}`;
    console.debug('url', url)
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.GetById];
    console.debug('operationConfig', operationConfig)
    const proxy: GetByKeyOperationHandler<unknown> = operationConfig.proxy as GetByKeyOperationHandler<unknown>;
    console.debug('proxy', proxy)
    return iif(
      () => !!proxy,
      of(url).pipe(
        map((url: string) => {
          console.log('modifying request', url)
          return proxy.modifyRequest(url);
        }),
        switchMap((url: string) => {
          console.log('executing request', url)
          return super.execute('GET', url);
        }),
        map((response: unknown) => {
          console.log('modifying response', response)
          return proxy.modifyResponse(response) as T;
        })
      ),
      super.getById(key)
    );
  }

  getWithQuery(queryParams: string|QueryParams): Observable<T[]> {
    console.debug('queryParams', queryParams)
    if (typeof queryParams === 'object') {
      queryParams = this.toQueryParamsString(queryParams);
      console.debug('queryParams', queryParams)
    }
    const resource: string = this.httpUrlGenerator.collectionResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}?${queryParams}`;
    console.debug('url', url)
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.GetWithQuery];
    console.debug('operationConfig', operationConfig)
    const proxy: GetWithQueryOperationHandler<unknown> = operationConfig.proxy as GetWithQueryOperationHandler<unknown>;
    console.debug('proxy', proxy)
    return iif(
      () => !!proxy,
      of(url).pipe(
        map((url: string) => {
          console.log('modifying request', url)
          return proxy.modifyRequest(url);
        }),
        switchMap((url: string) => {
          console.log('executing request', url)
          return super.execute('GET', url);
        }),
        map((response: unknown) => {
          console.log('modifying response', response)
          return proxy.modifyResponse(response) as T[];
        })
      ),
      super.getWithQuery(queryParams)
    );
  }

  update(update: Update<T>): Observable<T> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}${update.id}`;
    console.debug('url', url)
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Update];
    console.debug('operationConfig', operationConfig)
    const proxy: UpdateOperationHandler<unknown> = operationConfig.proxy as UpdateOperationHandler<unknown>;
    console.debug('proxy', proxy)
    return iif(
      () => !!proxy,
      of(update).pipe(
        map((update: Update<T>) => {
          console.log('modifying request', update.changes)
          return proxy.modifyRequest(update.changes);
        }),
        switchMap((data: unknown) => {
          console.log('executing request', url, data)
          return super.execute('PUT', url, data);
        }),
        map((response: unknown) => {
          console.log('modifying response', response)
          return proxy.modifyResponse(response) as T;
        })
      ),
      super.update(update)
    );
  }
  
  upsert(entity: T): Observable<T> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}`;
    console.debug('url', url)
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Upsert];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    return iif(
      () => !!proxy,
      of(entity).pipe(
        map((entity: T) => {
          console.log('modifying request', entity)
          return proxy.modifyRequest(entity);
        }),
        switchMap((data: unknown) => {
          console.log('executing request', url, data)
          return super.execute('POST', url, data);
        }),
        map((response: unknown) => {
          console.log('modifying response', response)
          return proxy.modifyResponse(response) as T;
        })
      ),
      super.upsert(entity)
    );
  }

  private toQueryParamsString(queryParams: QueryParams): string {
    const queryParamsRecord: Record<string, any> = queryParams;
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    for (const key in queryParamsRecord) {
      if (queryParamsRecord.hasOwnProperty(key)) {
        urlSearchParams.append(key, queryParamsRecord[key]);
      }
    }
    return urlSearchParams.toString();    
  }
}
