import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../core/services/authentication/current-user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-redirect',
  template: `
    <h1>Redirecting...</h1>
  `,
})
export class Redirect implements OnInit {
  private readonly router = inject(Router);
  private readonly userService = inject(CurrentUserService);

  public ngOnInit(): void {
    const redirect = sessionStorage.getItem(REDIRECT_KEY);
    if (redirect !== null && redirect.length > 0) {
      void this.router.navigateByUrl(redirect);
    } else {
      const user = this.userService.currentUser;
      if (!user) {
        this.userService.loadCurrentUser().pipe(take(1)).subscribe(u => void this.router.navigateByUrl(this.router.createUrlTree(['/', u.role.name.toLowerCase() ?? ''])));
      } else {
        void this.router.navigateByUrl(this.router.createUrlTree(['/', user.role?.name?.toLowerCase() ?? '']));
      }
    }
  }

}
