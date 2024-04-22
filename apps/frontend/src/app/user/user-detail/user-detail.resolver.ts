import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../core/user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailResolver implements Resolve<boolean> {
  constructor(private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    const userId: number = Number(route.paramMap.get('id'));
    return this.userService.getUserByKey(userId).pipe(map(() => true));
  }
}
