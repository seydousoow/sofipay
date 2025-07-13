import { Component, inject, input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Spinkit } from './spinkits';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.html',
  styleUrls: ['./spinner.css', './spinkit-css/sk-line-material.css'],
  encapsulation: ViewEncapsulation.None
})
export class Spinner implements OnDestroy {
  isSpinnerVisible = true;
  // noinspection SpellCheckingInspection
  Spinkit = Spinkit;
  readonly backgroundColor = input('#1dc4e9');
  readonly spinner = input(Spinkit.skLine);
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe({
        next: (event) => {
          if (event instanceof NavigationStart) {
            this.isSpinnerVisible = true;
          } else if ([NavigationEnd, NavigationCancel, NavigationError].some(s => event instanceof s)) {
            this.isSpinnerVisible = false;
          }
        }, error: () => this.isSpinnerVisible = false
      }
    );
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
