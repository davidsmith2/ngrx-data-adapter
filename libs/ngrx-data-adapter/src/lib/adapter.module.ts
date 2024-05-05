import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultDataServiceFactory, EntityEffects } from '@ngrx/data';
import { GraphQLQueryService } from './utils/classes/graphql-query.service';
import { AdapterDataServiceFactory } from './dataservices/classes/adapter-data-service-factory';
import { DataNormalizationService } from './utils/classes/data-normalization.service';
import { AdapterEntityEffects } from './effects/classes/adapter-entity-effects';
import { AdapterRootModule } from './adapter_root_module';

@NgModule({
  imports: [CommonModule]
})
export class AdapterModule {
  static forRoot(): ModuleWithProviders<AdapterRootModule> {
    return {
      ngModule: AdapterRootModule,
      providers: [
        // custom DefaultDataServiceFactory
        { provide: DefaultDataServiceFactory, useClass: AdapterDataServiceFactory },
        // custom EntityEffects
        { provide: EntityEffects, useClass: AdapterEntityEffects },
        // DataNormalizationService (reduceGraph, reduceFlat)
        DataNormalizationService,
        // GraphQLQueryService (toGraphQL, toQuery, toSubscripton)
        GraphQLQueryService
      ]
    };
  }
}
