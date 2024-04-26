import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { toFactorySelector } from 'ngrx-entity-relationship';
import { AddressRelationshipService } from '../../core/address/address-relationship.service';

@Component({
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressDetailComponent {
  address$: Observable<unknown>;

  private addressId$: Observable<number>;

  constructor(
    private addressRelationshipService: AddressRelationshipService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.addressId$ = this.activatedRoute.paramMap.pipe(
      map((paramMap: ParamMap) => +paramMap.get('id'))
    );
    this.address$ = this.addressId$.pipe(
      switchMap((addressId: number) => {
        const relationalSelector = toFactorySelector(this.addressRelationshipService.selectOne);
        return this.store.pipe(select(relationalSelector(addressId)));
      })
    );
  }

}
