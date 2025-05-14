import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: `
    <h1>Redirecting...</h1>
  `
})
export class RedirectComponent implements OnInit {
  private readonly router = inject(Router);

  public ngOnInit(): void {
    const redirect = sessionStorage.getItem(REDIRECT_KEY) ?? '/';
    void this.router.navigateByUrl(redirect);
  }

}
