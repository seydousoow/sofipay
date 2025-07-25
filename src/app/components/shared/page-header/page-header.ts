import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { Params, QueryParamsHandling, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftMini } from '@ng-icons/heroicons/mini';


@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
  imports: [RouterLink, NgIcon],
  viewProviders: [provideIcons({ heroArrowLeftMini })]
})
export class PageHeader {
  @Input({ required: true }) pageTitle!: string;
  @Input() pageSubtitle?: string;
  @Input({ transform: booleanAttribute }) displayPrevious = true;
  @Input() backLink?: string[];
  @Input() paramsBackLink?: Params;
  @Input() queryParamHandling: QueryParamsHandling = 'replace';
  @Input({ transform: booleanAttribute }) historyBack = false;
  @Output() backClicked = new EventEmitter<void>();
}
