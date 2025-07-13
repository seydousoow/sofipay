import { Component, inject, model, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, UrlTree } from '@angular/router';
import { AdminNavigationItems, NavigationItem } from './navigation-item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTrendingUpSolid, heroDocumentCurrencyEuroSolid, heroHomeSolid, heroMapPinSolid, heroRssSolid } from '@ng-icons/heroicons/solid';
import { CurrentUserService } from '../../../../core/services/authentication/current-user.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  templateUrl: './navigation.html',
  providers: [provideIcons({ heroArrowTrendingUpSolid, heroHomeSolid, heroMapPinSolid, heroRssSolid, heroDocumentCurrencyEuroSolid })]
})
export class Navigation {
  NavCollapsedMob = output();
  navCollapsed = model.required<boolean>();
  navCollapsedMob: boolean;
  windowWidth: number;

  navigations!: NavigationItem[];

  private router = inject(Router);
  private userService = inject(CurrentUserService);

  constructor() {
    this.navigations = AdminNavigationItems;
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }

  buildUrl(url: string[]): UrlTree {
    const prefix = this.userService.currentUser?.role?.name?.toLowerCase() ?? 'CUSTOMER';
    return this.router.createUrlTree([prefix, ...url]);
  }
}
