import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserRelationshipService } from '../core/user/user-relationship.service';
import { Observable } from 'rxjs';
import { User } from '@ngrx-data-adapter/api-interfaces';
import { map, switchMap, take } from 'rxjs/operators';
import { UserViewModel } from '../core/user/user-view-model';
import { UserService } from '../core/user/user.service';
import { Store, select } from '@ngrx/store';
import { toFactorySelector } from 'ngrx-entity-relationship';
import { EntityCollection } from '@ngrx/data';
import { PaginatorOptions } from '../paginator/paginator-options.interface';
import { PageChange } from '../paginator/page-change.interface';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  users$: Observable<Array<UserViewModel>>;
  search: string = '';
  displayPaginator: boolean;
  paginatorOptions$: Observable<PaginatorOptions>;

  constructor(
    private userService: UserService,
    private userRelationshipService: UserRelationshipService,
    private store: Store,
  ) {
    this.displayPaginator = environment.apiRoot === 'rest';
    this.paginatorOptions$ = this.userService.collection$.pipe(
      map((collection: EntityCollection<User>) => (collection as any).paginator)
    );
    this.users$ = this.userService.keys$.pipe(
      switchMap((keys: Array<number>) => {
        const relationalSelector = toFactorySelector(this.userRelationshipService.selectAll);
        return this.store.pipe(select(relationalSelector(keys)));
      })
    );
  }

  ngOnInit(): void { }

  trackingFn(_index: number, item: User): number {
    return item.id;
  }

  searchUsers(event: Event): void {
    event.preventDefault();
    this.userService.getUsersWithQuery(this.search).pipe(take(1)).subscribe();
  }

  addUser(event: Event): void {
    event.preventDefault();
    this.userService.createUser({id: -1, firstName: 'David', lastName: 'Smith'} as User).pipe(take(1)).subscribe();
  }

  updateUser(event: Event, id: number): void {
    event.preventDefault();
    this.userService.updateUser({
      id,
      firstName: 'John',
      lastName: 'Smith'
    } as User).pipe(take(1)).subscribe();
  }

  upsertUser(event: Event, id: number): void {
    event.preventDefault();
    this.userService.upsertUser({
      id,
      firstName: 'John',
      lastName: 'Craven'
    } as User).pipe(take(1)).subscribe();
  }

  deleteUser(event: Event, id: number): void {
    event.preventDefault();
    this.userService.deleteUser(id).pipe(take(1)).subscribe();
  }

  onPageChange(event: PageChange): void {
    this.userService.getWithQuery({
      page: event.page.toString(),
      limit: event.limit.toString()
    }).pipe(take(1)).subscribe();
  }

}
