import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Address, Company } from '@ngrx-data-adapter/api-interfaces';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';
import { AddressService } from '../core/address/address.service';
import { AddressRelationshipService } from '../core/address/address-relationship.service';

@Component({
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit {

  addresses$: Observable<Array<Address>>;

  constructor(
    private addressService: AddressService,
    private addressRelationshipService: AddressRelationshipService,
    private store: Store,
  ) {
    this.addresses$ = this.addressService.keys$.pipe(
      switchMap((keys: Array<number>) => {
        return this.store.pipe(select(toStaticSelector(this.addressRelationshipService.selectAll, keys)));
      })
    );
  }

  ngOnInit(): void { }

  trackingFn(_index: number, item: Company): number {
    return item.id;
  }

}
