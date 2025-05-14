import { CanMatchFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject } from '@angular/core';
import { from, tap } from 'rxjs';
import { AUTH_ROUTES } from '../utilities/constant';

export const RedirectGuard: CanMatchFn = (_route, _segments,
                                          service: AuthenticationService = inject(AuthenticationService),
                                          router: Router = inject(Router)) => {

  return from(service.validateToken()).pipe(
    tap(isValid => {
      if (!isValid) {
        service.oidcLogout();
        void router.navigate(['/', AUTH_ROUTES.login]);
      }
    })
  );
};
