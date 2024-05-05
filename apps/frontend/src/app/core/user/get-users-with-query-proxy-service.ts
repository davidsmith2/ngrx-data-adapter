import { Injectable } from '@angular/core';
import { GetWithQueryProxyService } from '@ngrx-data-adapter/ngrx-data-adapter';

@Injectable({ providedIn: 'root' })
export class GetUsersWithQueryProxyService<User> extends GetWithQueryProxyService<User> {
  modifyRequest(request: string): string {
    console.log('GetUsersWithQueryProxyService#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): Array<User> {
    console.log('GetUsersWithQueryProxyService#modifyResponse');
    return response as Array<User>;
  }
}
