import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver } from './user.resolver';
import { UserDetailResolver } from './user-detail/user-detail.resolver';

@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent,
        resolve: {
          usersLoaded: UserResolver
        }
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: {
          userLoaded: UserDetailResolver
        }
      }
]),
    FormsModule
  ]
})
export class UserModule { }
