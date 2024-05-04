import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../core/user/user.service';
import { map } from 'rxjs/operators';
import { User } from '@ngrx-data-adapter/api-interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {
  constructor(private userService: UserService) {}
  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    let users$: Observable<Array<User>>;
    if (environment.apiRoot === 'rest') {
      users$ = this.userService.getWithQuery({page: '1', limit: '3'});
    } else {
      users$ = this.userService.getAll();
    }
    return users$.pipe(map(() => true));
  }

}
