import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
