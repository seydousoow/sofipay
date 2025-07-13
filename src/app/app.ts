import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Spinner } from './components/shared/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Spinner],
  template: `
    <router-outlet>
      <app-spinner />
    </router-outlet>`
})
export class App implements OnInit {

  private router = inject(Router);

  ngOnInit() {
    this.router.events
      .pipe(filter(evt => !(evt instanceof NavigationEnd)))
      .subscribe(() => {
        window.scrollTo(0, 0);
        const theme = localStorage.getItem(THEME_KEY) === 'dark' ||
          (!(THEME_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', theme);
      });
  }

}
