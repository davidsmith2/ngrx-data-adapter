import { Injectable } from '@angular/core';
import { GetByIdProxyService } from '@ngrx-data-adapter/ngrx-data-adapter';

@Injectable({ providedIn: 'root' })
export class GetUserByIdProxyService<User> extends GetByIdProxyService<User> {
  modifyRequest(request: string): string {
    console.log('GetUserByKeyProxyService#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): User {
    console.log('GetUserByKeyProxyService#modifyResponse');
    return response as User;
  }
}