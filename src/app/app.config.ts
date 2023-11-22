import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors';

interface AppConfig {
  apiURL: string;
}
export const APP_CONFIG = new InjectionToken<AppConfig>('Application Config');
export const initAppConfig = (config: AppConfig) => {
  return {
    providers: [
      provideRouter(appRoutes),
      provideHttpClient(withInterceptors([authInterceptor])),
      provideAnimations(),
      provideToastr(),
      {
        provide: APP_CONFIG,
        useValue: config,
      },
    ],
  };
};
