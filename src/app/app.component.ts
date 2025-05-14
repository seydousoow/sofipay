import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  template: `
    <router-outlet>
      <app-spinner />
    </router-outlet>`
})
export class AppComponent implements OnInit {

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
