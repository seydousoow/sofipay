import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { Params, QueryParamsHandling, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftMini } from '@ng-icons/heroicons/mini';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
  imports: [RouterLink, NgIcon, CommonModule],
  viewProviders: [provideIcons({ heroArrowLeftMini })]
})
export class PageHeaderComponent {
  @Input({ required: true }) pageTitle!: string;
  @Input() pageSubtitle?: string;
  @Input({ transform: booleanAttribute }) displayPrevious = true;
  @Input() backLink?: string[];
  @Input() paramsBackLink?: Params;
  @Input() queryParamHandling: QueryParamsHandling = 'replace';
  @Input({ transform: booleanAttribute }) historyBack = false;
  @Output() backClicked = new EventEmitter<void>();
}
