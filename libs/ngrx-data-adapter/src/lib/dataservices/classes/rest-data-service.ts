import { HttpClient } from "@angular/common/http";
import { DefaultDataService, DefaultDataServiceConfig, HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { DataServiceMethod } from "../enumerations/data-service-method.enum";
import { AdapterEntityMetadataMap } from "../../entity-metadata/interfaces/adapter-entity-metadata-map.interface";
import { AdapterProxyServicesConfig } from "../../entity-metadata/interfaces/adapter-proxy-services-config.interface";
import { AddProxyService } from "../../proxy-services/classes/add-proxy-service";
import { DeleteProxyService } from "../../proxy-services/classes/delete-proxy-service";
import { UpsertProxyService } from "../../proxy-services/classes/upsert-proxy-service";
import { UpdateProxyService } from "../../proxy-services/classes/update-proxy-service";
import { GetWithQueryProxyService } from "../../proxy-services/classes/get-with-query-proxy-service";
import { GetByIdProxyService } from "../../proxy-services/classes/get-by-id-proxy-service";
import { GetAllProxyService } from "../../proxy-services/classes/get-all-proxy-service";
import { AdapterEntityConfig } from "../../entity-metadata/interfaces/adapter-entity-config.interface";

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
    const adapterEntityConfig: AdapterEntityConfig = this.entityMetadataMap[this.entityName].adapter;
    console.debug('adapterEntityConfig', adapterEntityConfig)
    if (adapterEntityConfig) {
      const adapterProxyServicesConfig: AdapterProxyServicesConfig = adapterEntityConfig.proxyServices;
      console.debug('adapterProxyServicesConfig', adapterProxyServicesConfig)
      if (adapterProxyServicesConfig) {
        const proxyService: AddProxyService<unknown> = adapterProxyServicesConfig[DataServiceMethod.Add] as AddProxyService<unknown>;
        console.debug('proxyService', proxyService)
        if (proxyService) {
          return of(entity).pipe(
            map((entity: T) => {
              console.log('modifying request', entity)
              return proxyService.modifyRequest(entity);
            }),
            switchMap((data: unknown) => {
              console.log('executing request', url, data)
              return super.execute('POST', url, data);
            }),
            map((response: unknown) => {
              console.log('modifying response', response)
              return proxyService.modifyResponse(response) as T;
            })
          );
        }
      }
    }
    return super.add(entity);
  }

  delete(key: string | number): Observable<string | number> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}${key}`;
    console.debug('url', url)
    const adapterEntityConfig: AdapterEntityConfig = this.entityMetadataMap[this.entityName].adapter;
    console.debug('adapterEntityConfig', adapterEntityConfig)
    if (adapterEntityConfig) {
      const adapterProxyServicesConfig: AdapterProxyServicesConfig = adapterEntityConfig.proxyServices;
      console.debug('adapterProxyServicesConfig', adapterProxyServicesConfig)
      if (adapterProxyServicesConfig) {
        const proxyService: DeleteProxyService = adapterProxyServicesConfig[DataServiceMethod.Delete] as DeleteProxyService;
        console.debug('proxyService', proxyService)
        if (proxyService) {
          return of(url).pipe(
            map((url: string) => {
              console.log('modifying request', url)
              return proxyService.modifyRequest(url);
            }),
            switchMap((url: string) => {
              console.log('executing request', url)
              return super.execute('DELETE', url);
            }),
            map((response: unknown) => {
              console.log('modifying response', response)
              return proxyService.modifyResponse(response) as string|number;
            })
          );
        }
      }
    }
    return super.delete(key);
  }

  getAll(): Observable<T[]> {
    const resource: string = this.httpUrlGenerator.collectionResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}`;
    console.debug('url', url)
    const adapterEntityConfig: AdapterEntityConfig = this.entityMetadataMap[this.entityName].adapter;
    console.debug('adapterEntityConfig', adapterEntityConfig)
    if (adapterEntityConfig) {
      const adapterProxyServicesConfig: AdapterProxyServicesConfig = adapterEntityConfig.proxyServices;
      console.debug('adapterProxyServicesConfig', adapterProxyServicesConfig)
      if (adapterProxyServicesConfig) {
        const proxyService: GetAllProxyService<unknown> = adapterProxyServicesConfig[DataServiceMethod.GetAll] as GetAllProxyService<unknown>;
        console.debug('proxyService', proxyService)
        if (proxyService) {
          return of(url).pipe(
            map((url: string) => {
              console.log('modifying request', url)
              return proxyService.modifyRequest(url);
            }),
            switchMap((url: string) => {
              console.log('executing request', url)
              return super.execute('GET', url);
            }),
            map((response: unknown) => {
              console.log('modifying response', response)
              return proxyService.modifyResponse(response) as T[];
            })
          );
        }
      }
    }
    return super.getAll();
  }

  getById(key: string | number): Observable<T> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}${key}`;
    console.debug('url', url)
    const adapterEntityConfig: AdapterEntityConfig = this.entityMetadataMap[this.entityName].adapter;
    console.debug('adapterEntityConfig', adapterEntityConfig)
    if (adapterEntityConfig) {
      const adapterProxyServicesConfig: AdapterProxyServicesConfig = adapterEntityConfig.proxyServices;
      console.debug('adapterProxyServicesConfig', adapterProxyServicesConfig)
      if (adapterProxyServicesConfig) {
        const proxyService: GetByIdProxyService<unknown> = adapterProxyServicesConfig[DataServiceMethod.GetById] as GetByIdProxyService<unknown>;
        console.debug('proxyService', proxyService)
        if (proxyService) {
          return of(url).pipe(
            map((url: string) => {
              console.log('modifying request', url)
              return proxyService.modifyRequest(url);
            }),
            switchMap((url: string) => {
              console.log('executing request', url)
              return super.execute('GET', url);
            }),
            map((response: unknown) => {
              console.log('modifying response', response)
              return proxyService.modifyResponse(response) as T;
            })
          );
        }
      }
    }
    return super.getById(key);
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
    const adapterEntityConfig: AdapterEntityConfig = this.entityMetadataMap[this.entityName].adapter;
    console.debug('adapterEntityConfig', adapterEntityConfig)
    if (adapterEntityConfig) {
      const adapterProxyServicesConfig: AdapterProxyServicesConfig = adapterEntityConfig.proxyServices;
      console.debug('adapterProxyServicesConfig', adapterProxyServicesConfig)
      if (adapterProxyServicesConfig) {
        const proxyService: GetWithQueryProxyService<unknown> = adapterProxyServicesConfig[DataServiceMethod.GetWithQuery] as GetWithQueryProxyService<unknown>;
        console.debug('proxyService', proxyService)
        if (proxyService) {
          return of(url).pipe(
            map((url: string) => {
              console.log('modifying request', url)
              return proxyService.modifyRequest(url);
            }),
            switchMap((url: string) => {
              console.log('executing request', url)
              return super.execute('GET', url);
            }),
            map((response: unknown) => {
              console.log('modifying response', response)
              return proxyService.modifyResponse(response) as T[];
            })
          );
        }
      }
    }
    return super.getWithQuery(queryParams);
  }

  update(update: Update<T>): Observable<T> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}${update.id}`;
    console.debug('url', url)
    const adapterEntityConfig: AdapterEntityConfig = this.entityMetadataMap[this.entityName].adapter;
    console.debug('adapterEntityConfig', adapterEntityConfig)
    if (adapterEntityConfig) {
      const adapterProxyServicesConfig: AdapterProxyServicesConfig = adapterEntityConfig.proxyServices;
      console.debug('adapterProxyServicesConfig', adapterProxyServicesConfig)
      if (adapterProxyServicesConfig) {
        const proxyService: UpdateProxyService<unknown> = adapterProxyServicesConfig[DataServiceMethod.Update] as UpdateProxyService<unknown>;
        console.debug('proxyService', proxyService)
        if (proxyService) {
          return of(update).pipe(
            map((update: Update<T>) => {
              console.log('modifying request', update.changes)
              return proxyService.modifyRequest(update.changes);
            }),
            switchMap((data: unknown) => {
              console.log('executing request', url, data)
              return super.execute('PUT', url, data);
            }),
            map((response: unknown) => {
              console.log('modifying response', response)
              return proxyService.modifyResponse(response) as T;
            })
          );
        }
      }
    }
    return super.update(update);
  }
  
  upsert(entity: T): Observable<T> {
    const resource: string = this.httpUrlGenerator.entityResource(this.entityName, this.dataServiceConfig.root);
    console.debug('resource', resource)
    let url: string = `${resource}`;
    console.debug('url', url)
    const adapterEntityConfig: AdapterEntityConfig = this.entityMetadataMap[this.entityName].adapter;
    console.debug('adapterEntityConfig', adapterEntityConfig)
    if (adapterEntityConfig) {
      const adapterProxyServicesConfig: AdapterProxyServicesConfig = adapterEntityConfig.proxyServices;
      console.debug('adapterProxyServicesConfig', adapterProxyServicesConfig)
      if (adapterProxyServicesConfig) {
        const proxyService: UpsertProxyService<unknown> = adapterProxyServicesConfig[DataServiceMethod.Upsert] as UpsertProxyService<unknown>;
        console.debug('proxyService', proxyService)
        if (proxyService) {
          return of(entity).pipe(
            map((entity: T) => {
              console.log('modifying request', entity)
              return proxyService.modifyRequest(entity);
            }),
            switchMap((data: unknown) => {
              console.log('executing request', url, data)
              return super.execute('POST', url, data);
            }),
            map((response: unknown) => {
              console.log('modifying response', response)
              return proxyService.modifyResponse(response) as T;
            })
          );
        }
      }
    }
    return super.upsert(entity);
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
