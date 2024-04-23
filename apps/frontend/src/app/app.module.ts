import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { ngrxEntityRelationshipReducer } from 'ngrx-entity-relationship';
import { RouterModule } from '@angular/router';

const NGRX_STORE_MIDDLEWARES: {[key: string]: any} = {
  devtools: StoreDevtoolsModule.instrument(),
  logger: []
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers: [ngrxEntityRelationshipReducer] }),
    EffectsModule.forRoot([]),
    !environment.production ? NGRX_STORE_MIDDLEWARES[environment.ngrxStoreMiddleware] : [],
    CoreModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'companies',
        loadChildren: () => import('./company/company.module').then((m) => m.CompanyModule),
      }
    ])
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
