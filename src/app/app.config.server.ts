import { ApplicationConfig, provideZoneChangeDetection, NgZone } from '@angular/core';
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
      provide: 'DISABLE_IMAGE_WARNINGS',
      useValue: true,
    },
    {
      provide: NgZone,
      useFactory: (ngZone: NgZone) => {
        // Suppress image performance warnings on server
        const originalOnError = ngZone.onError;
        ngZone.onError = (error: any) => {
          if (error?.message?.includes('ImagePerformanceWarning') || 
              error?.message?.includes('NG0913')) {
            return;
          }
          originalOnError.call(ngZone, error);
        };
        return ngZone;
      },
      deps: [NgZone],
    }
  ]
};
