import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressService } from '../core/address/address.service';

@Injectable({
  providedIn: 'root'
})
export class AddressResolver implements Resolve<boolean> {
  constructor(private addressService: AddressService) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return this.addressService.getAllAddresses().pipe(map(() => true));
  }

}
