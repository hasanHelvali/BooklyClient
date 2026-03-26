import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
 import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';


//  app.config.ts = uygulamanın çalışması için gereken global servislerin listesi. Router, animasyon, HTTP client, PrimeNG hepsi buraya kaydolur.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),// global JS hatalarını yakala
    provideRouter(routes),// routing'i aktif et, routes.ts'teki tanımları kullan
 providePrimeNG({
        theme: {
          preset: Aura,
          options: { darkModeSelector: false }
        }
      })    // PrimeNG'i uygulamaya tanıt, hangi temayı kullan söyle
  ]
  
};
