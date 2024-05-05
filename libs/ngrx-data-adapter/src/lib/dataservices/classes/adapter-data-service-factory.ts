import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { DefaultDataServiceConfig, DefaultDataServiceFactory, ENTITY_METADATA_TOKEN, EntityCollectionDataService, EntityMetadataMap, HttpUrlGenerator } from "@ngrx/data";
import { GraphQLQueryService } from "../../utils/classes/graphql-query.service";
import { GraphQLDataService } from "./graphql-data-service";
import { ADAPTER_RELATIONSHIP_SERVICES_TOKEN } from "../../utils/variables/adapter-relationship-services-token.constant";
import { RestDataService } from "./rest-data-service";

@Injectable()
export class AdapterDataServiceFactory extends DefaultDataServiceFactory {
  constructor(
    protected httpClient: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    protected dataServiceConfig: DefaultDataServiceConfig,
    private graphQLQueryService: GraphQLQueryService,
    @Inject(ENTITY_METADATA_TOKEN) protected entityMetadataMaps: Array<EntityMetadataMap>,
    @Inject(ADAPTER_RELATIONSHIP_SERVICES_TOKEN) protected relationshipServices: any,
    private defaultDataServiceConfig: DefaultDataServiceConfig
  ) {
    super(httpClient, httpUrlGenerator, dataServiceConfig);
  }

  create<T>(entityName: string): EntityCollectionDataService<T> {
    let service: any;
    if (this.defaultDataServiceConfig.root === 'graphql') {
      service = new GraphQLDataService(
        entityName,
        this.httpClient,
        this.httpUrlGenerator,
        this.dataServiceConfig
      );
      service.relationshipServices = this.relationshipServices;
      service.graphQLQueryService = this.graphQLQueryService;
      return service;
  
    } else {
      service = new RestDataService(
        entityName,
        this.httpClient,
        this.httpUrlGenerator,
        this.dataServiceConfig
      );
    }
    service.entityMetadataMap = this.entityMetadataMaps[0];
    return service;
  }
}
