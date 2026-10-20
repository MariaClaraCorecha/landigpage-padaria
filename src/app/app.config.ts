import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrDateAdapter } from './shared/br-date-adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNoopAnimations(),
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: BrDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
};
