import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Company } from '@ngrx-data-adapter/api-interfaces';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CompanyRelationshipService } from '../core/company/company-relationship.service';
import { CompanyService } from '../core/company/company.service';
import { Store, select } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';

@Component({
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit {

  companies$: Observable<Array<Company>>;

  constructor(
    private companyService: CompanyService,
    private companyRelationshipService: CompanyRelationshipService,
    private store: Store,
  ) {
    this.companies$ = this.companyService.keys$.pipe(
      switchMap((keys: Array<number>) => {
        return this.store.pipe(select(toStaticSelector(this.companyRelationshipService.selectAll, keys)));
      })
    );
  }

  ngOnInit(): void { }

  trackingFn(_index: number, item: Company): number {
    return item.id;
  }

}
