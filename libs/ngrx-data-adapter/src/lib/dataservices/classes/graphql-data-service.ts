import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ENTITY_SELECTOR } from "ngrx-entity-relationship";
import { Update } from "@ngrx/entity";
import { GraphQLQueryService } from "../../utils/classes/graphql-query.service";
import { AdapterOperationConfig } from "../../entity-metadata/interfaces/adapter-operation-config.interface";
import { OperationHandler } from "./operation-handler";
import { DATA_SERVICE_METHOD_TO_ENTITY_OP } from "../variables/data-service-method-to-entity-op.constant";
import { DataServiceMethod } from "../enumerations/data-service-method.enum";
import { AdapterEntityMetadataMap } from "../../entity-metadata/interfaces/adapter-entity-metadata-map.interface";
import { AdapterEntityMetadata } from "../../entity-metadata/interfaces/adapter-entity-metadata.interface";
import { RelationshipServiceMethod } from "../../relationship-services/enumerations/relationship-service-method.enum";

export class GraphQLDataService<T> extends DefaultDataService<T> {
  public entityMetadataMap: AdapterEntityMetadataMap;
  public relationshipServices: any;
  public graphQLQueryService: GraphQLQueryService;
  
  constructor(
    protected entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    protected dataServiceConfig: DefaultDataServiceConfig,
  ) {
    super(entityName, http, httpUrlGenerator, dataServiceConfig);
  }

  add(entity: T): Observable<T> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.Add));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.Add];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    const selectorName: string = RelationshipServiceMethod.AddOne;
    console.debug('selectorName', selectorName)
    const selector: ENTITY_SELECTOR = this.relationshipServices[this.entityName][selectorName];
    console.debug('selector', selector)
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    const requestHandlerUrl: string = resource.split('/')[1];
    console.debug('requestHandlerUrl', requestHandlerUrl)
    const graphQLStr: string = this.graphQLQueryService.toGraphQL(
      `${selectorName}_${requestHandlerUrl}`,
      {
        [requestHandlerUrl]: entity,
      },
      selector
    );
    console.debug('graphQLStr', graphQLStr)
    const queryStr: string = this.graphQLQueryService.toMutation(graphQLStr);
    console.debug('queryStr', queryStr)
    const url: string = `${this.dataServiceConfig.root}`;
    console.debug('url', url)
    const data: any = {query: queryStr};
    console.debug('data', data)
    return super.execute('POST', url, data, undefined).pipe(
      map((response: {data: any}) => response.data[`${selectorName}_${requestHandlerUrl}`])
    );
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
    const selectorName: string = RelationshipServiceMethod.DeleteOne;
    console.debug('selectorName', selectorName)
    const selector: ENTITY_SELECTOR = this.relationshipServices[this.entityName][selectorName];
    console.debug('selector', selector)
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    const requestHandlerUrl: string = resource.split('/')[1];
    console.debug('requestHandlerUrl', requestHandlerUrl)
    const graphQLStr: string = this.graphQLQueryService.toGraphQL(
      `${selectorName}_${requestHandlerUrl}`,
      {
        id: key,
      },
      selector
    );
    console.debug('graphQLStr', graphQLStr)
    const queryStr: string = this.graphQLQueryService.toMutation(graphQLStr);
    console.debug('queryStr', queryStr)
    const url: string = `${this.dataServiceConfig.root}`;
    console.debug('url', url)
    const data: any = {query: queryStr};
    console.debug('data', data)
    return super.execute('POST', url, data, undefined).pipe(
      map((response: {data: any}) => response.data[`${selectorName}_${requestHandlerUrl}`])
    );
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
    const selectorName: string = RelationshipServiceMethod.SelectAll;
    console.debug('selectorName', selectorName)
    const selector: ENTITY_SELECTOR = this.relationshipServices[this.entityName][selectorName];
    console.debug('selector', selector)
    if (proxy) {
      try {
        proxy.matchRequest(null, null);
      } catch (error) {
        console.warn(error);
      }
    }
    const resource: string = this.httpUrlGenerator.collectionResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource' ,resource)
    const requestHandlerUrl: string = resource.split('/')[1];
    console.debug('requestHandlerUrl', requestHandlerUrl)
    const graphQLStr: string = this.graphQLQueryService.toGraphQL(`${selectorName}_${requestHandlerUrl}`, selector);
    console.debug('graphQLStr', graphQLStr)
    const queryStr: string = this.graphQLQueryService.toQuery(graphQLStr);
    console.debug('queryStr', queryStr)
    const encodedQueryStr: string = encodeURIComponent(queryStr);
    console.debug('encodedQueryStr', encodedQueryStr)
    const url: string = `${this.dataServiceConfig.root}?${encodedQueryStr.replace(/query%7B/g, 'query=%7B')}`;
    console.debug('url', url)
    return super.execute('GET', url, undefined, undefined).pipe(
      map((response: {data: any}) => response.data[`${selectorName}_${requestHandlerUrl}`])
    );
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
    const selectorName: string = RelationshipServiceMethod.SelectOne;
    console.debug('selectorName', selectorName)
    const selector: ENTITY_SELECTOR = this.relationshipServices[this.entityName][selectorName];
    console.debug('selector', selector)
    if (proxy) {
      try {
        proxy.matchRequest(null, null);
      } catch (error) {
        console.warn(error);
      }
    }
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    const requestHandlerUrl: string = resource.split('/')[1];
    console.debug('requestHandlerUrl', requestHandlerUrl)
    const graphQLStr: string = this.graphQLQueryService.toGraphQL(`${selectorName}_${requestHandlerUrl}`, {id: key}, selector);
    console.debug('graphQLStr', graphQLStr)
    const queryStr: string = this.graphQLQueryService.toQuery(graphQLStr);
    console.debug('queryStr', queryStr)
    const encodedQueryStr: string = encodeURIComponent(queryStr);
    console.debug('encodedQueryStr', encodedQueryStr)
    const url: string = `${this.dataServiceConfig.root}?${encodedQueryStr.replace(/query%7B/g, 'query=%7B')}`;
    console.debug('url', url)
    return super.execute('GET', url, undefined, undefined).pipe(
      map((response: {data: any}) => response.data[`${selectorName}_${requestHandlerUrl}`])
    );
}

  getWithQuery(queryParams: string | QueryParams): Observable<T[]> {
    console.debug('entityName', this.entityName)
    console.debug('entityOp', DATA_SERVICE_METHOD_TO_ENTITY_OP.get(DataServiceMethod.GetWithQuery));
    const entityMetadata: Partial<AdapterEntityMetadata<any>> = this.entityMetadataMap[this.entityName].adapter;
    console.debug('entityMetadata', entityMetadata)
    const operationConfig: Partial<AdapterOperationConfig> = entityMetadata[DataServiceMethod.GetWithQuery];
    console.debug('operationConfig', operationConfig)
    const proxy: OperationHandler<unknown> = operationConfig.proxy;
    console.debug('proxy', proxy)
    const selectorName: string = RelationshipServiceMethod.SelectAll;
    console.debug('selectorName', selectorName)
    const selector: ENTITY_SELECTOR = this.relationshipServices[this.entityName][selectorName];
    console.debug('selector', selector)
    const resource: string = this.httpUrlGenerator.collectionResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource' ,resource)
    const requestHandlerUrl: string = resource.split('/')[1];
    console.debug('requestHandlerUrl', requestHandlerUrl)
    const graphQLStr: string = this.graphQLQueryService.toGraphQL(`${selectorName}_${requestHandlerUrl}`, queryParams, selector);
    console.debug('graphQLStr', graphQLStr)
    const queryStr: string = this.graphQLQueryService.toQuery(graphQLStr);
    console.debug('queryStr', queryStr)
    const encodedQueryStr: string = encodeURIComponent(queryStr);
    console.debug('encodedQueryStr', encodedQueryStr)
    const url: string = `${this.dataServiceConfig.root}?${encodedQueryStr.replace(/query%7B/g, 'query=%7B')}`;
    console.debug('url', url)
    return super.execute('GET', url, undefined, undefined).pipe(
      map((response: {data: any}) => response.data[`${selectorName}_${requestHandlerUrl}`])
    );
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
    const selectorName: string = RelationshipServiceMethod.UpdateOne;
    console.debug('selectorName', selectorName)
    const selector: ENTITY_SELECTOR = this.relationshipServices[this.entityName][selectorName];
    console.debug('selector', selector)
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    const requestHandlerUrl: string = resource.split('/')[1];
    console.debug('requestHandlerUrl', requestHandlerUrl)
    const graphQLStr: string = this.graphQLQueryService.toGraphQL(
      `${selectorName}_${requestHandlerUrl}`,
      {
        [requestHandlerUrl]: update.changes,
      },
      selector
    );
    console.debug('graphQLStr', graphQLStr)
    const queryStr: string = this.graphQLQueryService.toMutation(graphQLStr);
    console.debug('queryStr', queryStr)
    const url: string = `${this.dataServiceConfig.root}`;
    console.debug('url', url)
    const data: any = {query: queryStr};
    console.debug('data', data)
    return super.execute('POST', url, data, undefined).pipe(
      map((response: {data: any}) => response.data[`${selectorName}_${requestHandlerUrl}`])
    );
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
    const selectorName: string = RelationshipServiceMethod.UpsertOne;
    console.debug('selectorName', selectorName)
    const selector: ENTITY_SELECTOR = this.relationshipServices[this.entityName][selectorName];
    console.debug('selector', selector)
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    const requestHandlerUrl: string = resource.split('/')[1];
    console.debug('requestHandlerUrl', requestHandlerUrl)
    const graphQLStr: string = this.graphQLQueryService.toGraphQL(
      `${selectorName}_${requestHandlerUrl}`,
      {
        id: entity['id'],
        [requestHandlerUrl]: entity,
      },
      selector
    );
    console.debug('graphQLStr', graphQLStr)
    const queryStr: string = this.graphQLQueryService.toMutation(graphQLStr);
    console.debug('queryStr', queryStr)
    const url: string = `${this.dataServiceConfig.root}`;
    console.debug('url', url)
    const data: any = {query: queryStr};
    console.debug('data', data)
    return super.execute('POST', url, data, undefined).pipe(
      map((response: {data: any}) => response.data[`${selectorName}_${requestHandlerUrl}`])
    );
}

}
