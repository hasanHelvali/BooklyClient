import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();
  const start = Date.now();

  return next(req).pipe(
    finalize(() => {
      /*
      ● İstek ne kadar sürdü ölçtük (elapsed). 500ms'den kısa sürdüyse farkı bekleyip (remaining) sonra spinner'ı kapattık. İstek zaten
  500ms'den uzun sürdüyse direkt kapanıyor.

  ● finalize — observable tamamlandığında veya hata verdiğinde tetiklenir. Yani HTTP isteği cevap döndüğünde veya hata aldığında
  çalışır. "İstek bitti, ne olursa olsun şunu yap" demek.

>  Math.max(0, 500 - elapsed); bu ne is yaptı

● elapsed 500'den büyükse (istek 500ms'den uzun sürdüyse) 500 - elapsed negatif olur. Math.max(0, ...) ile negatif olmasını
  engelledik — minimum 0 bekle demek. Yani spinner eksi süre beklemesin.
      */
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 500 - elapsed);
      setTimeout(() => loadingService.hide(), remaining);
    }),
  );
};

/*

Spinner Rehberi 

Angular'da global spinner için HttpInterceptor kullanacağız.

  1. core/services/ altına loading.service.ts oluştur:

  import { Injectable, signal } from '@angular/core';

  @Injectable({ providedIn: 'root' })
  export class LoadingService {
    isLoading = signal(false);

    show() { this.isLoading.set(true); }
    hide() { this.isLoading.set(false); }
  }

  2. core/interceptors/ altına loading.interceptor.ts oluştur:

  import { HttpInterceptorFn } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { LoadingService } from '../services/loading.service';
  import { finalize } from 'rxjs';

  export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);
    loadingService.show();
    return next(req).pipe(
      finalize(() => loadingService.hide())
    );
  };

  3. app.config.ts'e interceptor'ı ekle:

  import { provideHttpClient, withInterceptors } from '@angular/common/http';
  import { loadingInterceptor } from './core/interceptors/loading.interceptor';

  provideHttpClient(withInterceptors([loadingInterceptor]))

  4. app.html'e spinner ekle:

  @if (loadingService.isLoading()) {
    <div class="spinner-overlay">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
  }
  <router-outlet />

  5. app.ts'e:

  import { LoadingService } from './core/services/loading.service';

  export class App {
    loadingService = inject(LoadingService);
  }

  6. styles.css'e:

  .spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
*/
