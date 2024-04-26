import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Company } from '@ngrx-data-adapter/api-interfaces';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CompanyRelationshipService } from '../../core/company/company-relationship.service';
import { Store, select } from '@ngrx/store';
import { toFactorySelector } from 'ngrx-entity-relationship';

@Component({
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDetailComponent {
  company$: Observable<Company>;

  private companyId$: Observable<number>;

  constructor(
    private companyRelationshipService: CompanyRelationshipService,
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
  }

}
