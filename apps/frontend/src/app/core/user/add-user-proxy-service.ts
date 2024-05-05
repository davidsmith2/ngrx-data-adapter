import { Injectable } from '@angular/core';
import { AddProxyService } from '@ngrx-data-adapter/ngrx-data-adapter';

@Injectable({ providedIn: 'root' })
export class AddUserProxyService<User> extends AddProxyService<User> {
  modifyRequest(request: User): unknown {
    console.log('AddUserProxyService#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): User {
    console.log('AddUserProxyService#modifyResponse');
    return response as User;
  }
}