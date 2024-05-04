import { Injectable } from '@angular/core';
import { EntityCollectionReducerMethodsFactory, EntityDefinitionService, EntityCollectionReducerMethodMap, HttpUrlGenerator, DefaultDataServiceConfig } from '@ngrx/data';
import { CoreEntityCollectionReducerMethods } from './core-entity-collection-reducer-methods';

@Injectable()
export class CoreEntityCollectionReducerMethodsFactory extends EntityCollectionReducerMethodsFactory {
  constructor(private myEntityDefinitionService: EntityDefinitionService) {
    super(myEntityDefinitionService);
  }

  create<T>(entityName: string): EntityCollectionReducerMethodMap<T> {
    const defaultMethods: EntityCollectionReducerMethodMap<T> = super.create<T>(entityName);
    const definition = this.myEntityDefinitionService.getDefinition<T>(
      entityName
    );
    const adaptermethodsClass = new CoreEntityCollectionReducerMethods(
      entityName,
      definition
    );
    const adaptermethods: EntityCollectionReducerMethodMap<T> = adaptermethodsClass.methods
    return {...defaultMethods, ...adaptermethods};
  }

}
