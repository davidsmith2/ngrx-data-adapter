import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../core/company/company.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyResolver implements Resolve<boolean> {
  constructor(private companyService: CompanyService) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return this.companyService.getAllCompanies().pipe(map(() => true));
  }

}
