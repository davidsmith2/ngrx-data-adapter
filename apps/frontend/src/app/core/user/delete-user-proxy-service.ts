import { Injectable } from '@angular/core';
import { DeleteProxyService } from '@ngrx-data-adapter/ngrx-data-adapter';

@Injectable({ providedIn: 'root' })
export class DeleteUserProxyService extends DeleteProxyService {
  modifyRequest(request: string): string {
    console.log('DeleteUserProxyService#modifyRequest');
    return request;
  }
  modifyResponse(response: unknown): string|number {
    console.log('DeleteUserProxyService#modifyResponse');
    return response as string|number;
  }
}