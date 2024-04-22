import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDataServiceConfig, DefaultHttpUrlGenerator, HttpUrlGenerator, Pluralizer } from '@ngrx/data';
import { EntityDataModule } from '@ngrx/data';
import { AdapterEntityCollectionServiceBase, NgrxDataAdapterModule } from '@ngrx-data-adapter/ngrx-data-adapter';
import { CoreEntityCollectionServiceBase } from './core-entity-collection-service-base';
import { CORE_DATA_SERVICE_CONFIG } from './core-data-service-config.constant';
import { CoreEntityMetadataProvider } from './core-entity-metadata-provider.constant';
import { CoreRelationshipServicesProvider } from './core-relationship-services-provider.constant';
import { CoreHttpUrlGenerator } from './core-http-url-generator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntityDataModule,
    NgrxDataAdapterModule.forRoot()
  ],
  providers: [
    // ngrx-data extension points
    CoreEntityMetadataProvider,
    { provide: DefaultDataServiceConfig, useValue: CORE_DATA_SERVICE_CONFIG },
    { provide: HttpUrlGenerator, useClass: CoreHttpUrlGenerator },
    // custom providers
    CoreRelationshipServicesProvider,
    { provide: AdapterEntityCollectionServiceBase, useClass: CoreEntityCollectionServiceBase, multi: true}
  ]
})
export class NgrxDataAdapterConfigModule { }
