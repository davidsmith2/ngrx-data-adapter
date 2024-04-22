import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRelationshipService } from '../../core/user/user-relationship.service';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserViewModel } from '../../core/user/user-view-model';
import { Store, select } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';

@Component({
  selector: 'ngrx-data-adapter-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  user$: Observable<UserViewModel>;

  private userId$: Observable<number>;

  constructor(
    private userRelationshipService: UserRelationshipService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId$ = this.activatedRoute.paramMap.pipe(
      map((paramMap: ParamMap) => {
        return +paramMap.get('id');
      })
    );
    this.user$ = this.userId$.pipe(
      switchMap((userId: number) => {
        return this.store.pipe(select(toStaticSelector(this.userRelationshipService.selectOne, userId)));
      })
    );
  }

  ngOnInit(): void { }

}
