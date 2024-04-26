import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RouterModule } from '@angular/router';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyResolver } from './company.resolver';
import { CompanyDetailResolver } from './company-detail/company-detail.resolver';



@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyComponent,
        resolve: {
          companiesLoaded: CompanyResolver
        }
      },
      {
        path: ':id',
        component: CompanyDetailComponent,
        resolve: {
          companyLoaded: CompanyDetailResolver
        }
      }
])
  ]
})
export class CompanyModule { }
