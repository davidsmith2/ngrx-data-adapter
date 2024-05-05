import { Injectable } from '@angular/core';
import { UpsertProxyService } from '@ngrx-data-adapter/ngrx-data-adapter';

@Injectable({ providedIn: 'root' })
export class UpsertUserProxyService<User> extends UpsertProxyService<User> {
  modifyRequest(request: User): unknown {
    console.log('UpsertUserProxyService#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): User {
    console.log('UpsertUserProxyService#modifyResponse');
    return response as User;
  }
}