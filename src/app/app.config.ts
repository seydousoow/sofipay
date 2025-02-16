import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeSn from '@angular/common/locales/fr-SN';
import { setDefaultOptions } from 'date-fns';
import { fr as frDateFnsLocale } from 'date-fns/locale';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { PrimeNGCustomPreset } from './primeng/preset';
import { PrimeNgFrTranslation } from './primeng/locale.fr';

registerLocaleData(localeSn);

setDefaultOptions({ locale: frDateFnsLocale, weekStartsOn: 1 });

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr_SN' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withInterceptors([])),
    provideAnimationsAsync(),
    providePrimeNG({
      inputStyle: 'filled',
      inputVariant: 'filled',
      ripple: true,
      translation: PrimeNgFrTranslation,
      theme: {
        preset: PrimeNGCustomPreset,
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'base, theme, components, primeng, utilities'
          }
        }

      }
    })
  ]
};
