import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideServerRendering } from '@angular/platform-server';
import { routes } from './app.routes';

export const config: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    provideServerRendering(),
    {
      provide: DOCUMENT,
      useValue: typeof document !== 'undefined' ? document : undefined,
    }
  ]
};
