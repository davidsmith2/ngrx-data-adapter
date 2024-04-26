import { Injectable } from '@angular/core';
import { DefaultHttpUrlGenerator, Pluralizer } from '@ngrx/data';
import { environment } from 'apps/frontend/src/environments/environment';

@Injectable()
export class CoreHttpUrlGenerator extends DefaultHttpUrlGenerator {
  constructor(pluralizer: Pluralizer) {
    super(pluralizer);
  }
  collectionResource(entityName: string, root: string): string {
    if (environment.apiRoot === 'rest' && entityName === 'User') {
      return root + '/user';
    }
    if (environment.apiRoot === 'graphql' && entityName === 'User') {
      return root + '/users';
    }
    if (environment.apiRoot === 'rest' && entityName === 'Company') {
      return root + '/company';
    }
    if (environment.apiRoot === 'graphql' && entityName === 'Company') {
      return root + '/companies';
    }
    if (environment.apiRoot === 'rest' && entityName === 'Address') {
      return root + '/address';
    }
    if (environment.apiRoot === 'graphql' && entityName === 'Address') {
      return root + '/addresses';
    }
    return root;
  }
}

