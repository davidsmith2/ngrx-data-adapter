import { Injectable } from '@angular/core';
import { UpdateProxyService } from '@ngrx-data-adapter/ngrx-data-adapter';

@Injectable({ providedIn: 'root' })
export class UpdateUserProxyService<User> extends UpdateProxyService<User> {
  modifyRequest(request: User): unknown {
    console.log('UpdateUserProxyService#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): User {
    console.log('UpdateUserProxyService#modifyResponse');
    return response as User;
  }
}