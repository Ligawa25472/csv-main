import { mergeApplicationConfig, ApplicationConfig, DOCUMENT } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: DOCUMENT,
      useValue: {}
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
