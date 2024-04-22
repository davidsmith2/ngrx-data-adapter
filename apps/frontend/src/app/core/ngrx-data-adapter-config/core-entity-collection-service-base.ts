import { Injectable } from '@angular/core';
import { AdapterEntityCollectionServiceBase } from '@ngrx-data-adapter/ngrx-data-adapter';
  
@Injectable({ providedIn: 'root' })
export class CoreEntityCollectionServiceBase<T> extends AdapterEntityCollectionServiceBase<T> { }