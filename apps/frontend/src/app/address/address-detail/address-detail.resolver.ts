import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressService } from '../../core/address/address.service';

@Injectable({
  providedIn: 'root'
})
export class AddressDetailResolver implements Resolve<boolean> {
  constructor(private addressService: AddressService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    const addressId: number = Number(route.paramMap.get('id'));
    return this.addressService.getAddressByKey(addressId).pipe(map(() => true));
  }

}
