import { Injectable } from '@angular/core';
import { GetAllProxyService } from '@ngrx-data-adapter/ngrx-data-adapter';

@Injectable({ providedIn: 'root' })
export class GetAllUsersProxyService<User> extends GetAllProxyService<User> {
  modifyRequest(request: string): string {
    console.log('GetAllUsersProxyService#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): Array<User> {
    console.log('GetAllUsersProxyService#modifyResponse');
    return response as Array<User>;
  }
}