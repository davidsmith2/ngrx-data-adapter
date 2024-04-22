export * from './lib/dataservices/classes/add-operation-handler';
export * from './lib/dataservices/classes/adapter-data-service-factory';
export * from './lib/dataservices/classes/graphql-data-service';
export * from './lib/dataservices/classes/delete-operation-handler';
export * from './lib/dataservices/classes/get-all-operation-handler';
export * from './lib/dataservices/classes/get-by-key-operation-handler';
export * from './lib/dataservices/classes/get-with-query-operation-handler';
export * from './lib/dataservices/classes/operation-handler';
export * from './lib/dataservices/classes/remote-operation-registry';
export * from './lib/dataservices/classes/rest-data-service';
export * from './lib/dataservices/classes/update-operation-handler';
export * from './lib/dataservices/classes/upsert-operation-handler';
export * from './lib/dataservices/classes/operation.interceptor';
export * from './lib/dataservices/enumerations/data-service-method.enum';
export * from './lib/dataservices/functions/remote-operation.decorator';
export * from './lib/dataservices/interfaces/entities-operation-handler.interface';
export * from './lib/dataservices/interfaces/entity-operation-handler.interface';
export * from './lib/dataservices/interfaces/read-operation-handler.interface';
export * from './lib/dataservices/interfaces/remote-operation-options.interface';
export * from './lib/dataservices/interfaces/write-operation-handler.interface';
export * from './lib/dataservices/interfaces/operation-handler-options.interface';
export * from './lib/dataservices/variables/data-service-method-to-entity-op.constant';
export * from './lib/dataservices/variables/entity-op-to-data-service-method.constant';
export * from './lib/effects/classes/adapter-entity-effects';
export * from './lib/effects/classes/persist-success-action';
export * from './lib/effects/interfaces/relationship-action.interface';
export * from './lib/effects/variables/persist-success-action-type.constant';
export * from './lib/entity-metadata/interfaces/adapter-entity-config.interface';
export * from './lib/entity-metadata/interfaces/adapter-entity-metadata-map.interface';
export * from './lib/entity-metadata/interfaces/adapter-entity-metadata.interface';
export * from './lib/entity-metadata/interfaces/adapter-operation-config.interface';
export * from './lib/entity-metadata/interfaces/adapter-relationship-config.interface';
export * from './lib/entity-services/classes/adapter-entity-collection-service-base';
export * from './lib/reducers/classes/adapter-entity-collection-reducer-methods-factory';
export * from './lib/reducers/classes/adapter-entity-collection-reducer-methods';
export * from './lib/relationship-services/enumerations/relationship-service-method.enum';
export * from './lib/relationship-services/interfaces/default-relationship-service.interface';
export * from './lib/relationship-services/variables/entity-op-to-relationship-service-method.constant';
export * from './lib/utils/classes/data-normalization.service';
export * from './lib/utils/classes/graphql-query.service';
export * from './lib/utils/interfaces/adapter-config.interface';
export * from './lib/utils/variables/adapter-config-token.constant';
export * from './lib/utils/variables/adapter-relationship-services-token.constant';
export * from './lib/adapter_root_module';

export { AdapterModule as NgrxDataAdapterModule } from './lib/adapter.module';
