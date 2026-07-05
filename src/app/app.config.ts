import { ApplicationConfig, provideZoneChangeDetection, PLATFORM_ID } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    {
      provide: 'BROWSER_ONLY',
      useFactory: (platformId: string) => isPlatformBrowser(platformId),
      deps: [PLATFORM_ID],
    },
    provideClientHydration(),
  ],
};
