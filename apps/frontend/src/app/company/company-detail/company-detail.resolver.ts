import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../../core/company/company.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailResolver implements Resolve<boolean> {
  constructor(private companyService: CompanyService) {}

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    const companyId: number = Number(route.paramMap.get('id'));
    return this.companyService.getCompanyByKey(companyId).pipe(map(() => true));
  }

}
