import { DefaultDataService } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { Observable, of } from "rxjs";

export class RestDataService<T> extends DefaultDataService<T> {
  add(entity: T): Observable<T> {
    return super.add(entity);
  }
  delete(key: string | number): Observable<string | number> {
    return super.delete(key);
  }
  getAll(): Observable<T[]> {
    return super.getAll();
  }
  getById(key: string | number): Observable<T> {
    return super.getById(key);
  }
  getWithQuery(query: string): Observable<T[]> {
    return super.getWithQuery(query);
  }
  update(update: Update<T>): Observable<T> {
    return super.update(update);
  }
  upsert(entity: T): Observable<T> {
    return super.upsert(entity);
  }
}
