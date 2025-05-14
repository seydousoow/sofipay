import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './services/authentication/authentication.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>,
                                                   next: HttpHandlerFn,
                                                   authService = inject(AuthenticationService)) => {
  if (req.url.startsWith(API_URL)) {
    return next(req.clone({ headers: req.headers.set('Authorization', `Bearer ${authService.accessToken}`) }));
  }
  return next(req);
};
