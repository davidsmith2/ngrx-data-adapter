import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Address, Company } from '@ngrx-data-adapter/api-interfaces';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CompanyRelationshipService } from '../../core/company/company-relationship.service';
import { Store, select } from '@ngrx/store';
import { toFactorySelector, toStaticSelector } from 'ngrx-entity-relationship';
import { AddressRelationshipService } from '../../core/address/address-relationship.service';

@Component({
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent implements OnInit {
  company$: Observable<Company>;
  address$: Observable<any>;

  private companyId$: Observable<number>;

  constructor(
    private companyRelationshipService: CompanyRelationshipService,
    private addressRelationshipService: AddressRelationshipService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.companyId$ = this.activatedRoute.paramMap.pipe(
      map((paramMap: ParamMap) => +paramMap.get('id'))
    );
    this.company$ = this.companyId$.pipe(
      switchMap((companyId: number) => {
        const relationalSelector = toFactorySelector(this.companyRelationshipService.selectOne);
        return this.store.pipe(select(relationalSelector(companyId)));
      })
    );
    this.address$ = this.company$.pipe(
      switchMap((company: Company) => {
        const relationalSelector = toFactorySelector(this.addressRelationshipService.selectOne);
        return this.store.pipe(select(relationalSelector(company.addressId)));
      })
    );
  }

  ngOnInit(): void { }

}
