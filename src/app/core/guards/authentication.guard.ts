import { CanMatchFn, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { inject, isDevMode } from '@angular/core';
import { CurrentUserService } from '../services/authentication/current-user.service';
import { catchError, map, Observable, of } from 'rxjs';
import { AUTH_ROUTES } from '../utilities/constant';
import { IAuthUser } from '../model/user.model';

export const AuthenticationGuard: CanMatchFn = (_route: Route,
                                                segments: UrlSegment[],
                                                service: AuthenticationService = inject(AuthenticationService),
                                                router: Router = inject(Router),
                                                currentUserService: CurrentUserService = inject(CurrentUserService)) => {
  if (!service.isLoggedIn()) {
    sessionStorage.setItem(REDIRECT_KEY, segments.join('/'));
    void router.navigate(['/', AUTH_ROUTES.login]);
    return false;
  }
  const currentUser = currentUserService.currentUser;
  if (!currentUser) {
    return fetchUser(router, currentUserService);
  }
  return handleRedirection(currentUser, router);
};

const fetchUser = (router: Router, currentUserService: CurrentUserService): Observable<UrlTree | boolean> => {
  return currentUserService.loadCurrentUser().pipe(
    map(user => handleRedirection(user, router)),
    catchError((err) => {
      if (isDevMode()) {
        console.error('Error loading current user', err);
      }
      return of(router.parseUrl(`/${AUTH_ROUTES.unauthorized}`));
    })
  );
};

const handleRedirection = (user: IAuthUser, router: Router): UrlTree | boolean => {
  if (!user.blocked) {
    const redirect = sessionStorage.getItem(REDIRECT_KEY);
    sessionStorage.removeItem(REDIRECT_KEY);
    if (redirect?.startsWith(`${user.role.name.toLowerCase()}`)) {
      return router.parseUrl(`${redirect}`);
    }
    return true;
  }
  return router.parseUrl(`/${AUTH_ROUTES.unauthorized}`);
};
