import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddressComponent } from './address.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { AddressResolver } from './address.resolver';
import { AddressDetailResolver } from './address-detail/address-detail.resolver';

@NgModule({
  declarations: [
    AddressComponent,
    AddressDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddressComponent,
        resolve: {
          addressesLoaded: AddressResolver
        }
      },
      {
        path: ':id',
        component: AddressDetailComponent,
        resolve: {
          addressLoaded: AddressDetailResolver
        }
      },
])
  ]
})
export class AddressModule { }
