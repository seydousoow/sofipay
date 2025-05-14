import { ApplicationConfig, inject, LOCALE_ID, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeSn from '@angular/common/locales/fr-SN';
import { setDefaultOptions } from 'date-fns';
import { fr as frDateFnsLocale } from 'date-fns/locale';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import primeNGConfiguration from './primeng/config';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { PermissionGuard } from './core/guards/permission.guard';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './core/auth.interceptor';
import { provideNgIconsConfig, withContentSecurityPolicy, withExceptionLogger } from '@ng-icons/core';

registerLocaleData(localeSn);

setDefaultOptions({ locale: frDateFnsLocale, weekStartsOn: 1 });

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr_SN' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideOAuthClient(),
    PermissionGuard,
    provideAppInitializer(() => ((service: AuthenticationService) => service.initialize())(inject(AuthenticationService))),
    provideAnimationsAsync(),
    providePrimeNG(primeNGConfiguration),
    provideNgIconsConfig({}, withContentSecurityPolicy(), withExceptionLogger())
  ]
};
