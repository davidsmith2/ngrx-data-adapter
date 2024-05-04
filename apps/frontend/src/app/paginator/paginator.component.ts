import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PaginatorOptions } from './paginator-options.interface';
import { PaginatorConfig } from './paginator.config.interface';
import { PageChange } from './page-change.interface';

@Component({
  selector: 'ngrx-data-adapter-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnChanges {
  @Input() options: PaginatorOptions;
  @Input() limits: Array<number>;

  @Output() pageChange: EventEmitter<PageChange> = new EventEmitter();

  config: PaginatorConfig;

  constructor() { }

  ngOnChanges(_changes: SimpleChanges): void {
    this.config = {
      ...this.options,
      pages: Array.from({ length: this.options.pages }, (_, i) => i + 1),
      limits: this.limits
    };
  }

  changePage(event: Event, page: number): void {
    event.preventDefault();
    this.pageChange.emit({page, limit: this.config.limit});
  }

  changeLimit(event: Event, limit: number): void {
    event.preventDefault();
    this.pageChange.emit({limit, page: this.config.page});
  }

}
