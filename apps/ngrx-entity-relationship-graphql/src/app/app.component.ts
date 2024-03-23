import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ngrx-entity-relationship-graphql/api-interfaces';

@Component({
  selector: 'ngrx-entity-relationship-graphql-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
