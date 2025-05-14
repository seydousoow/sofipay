import { Component, model, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  NavCollapsedMob = output();
  navCollapsed = model.required<boolean>();
  navCollapsedMob: boolean;
  windowWidth: number;

  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}
