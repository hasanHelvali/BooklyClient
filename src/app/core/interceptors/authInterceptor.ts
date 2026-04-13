import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((response) => {
              localStorage.setItem('token', response.token);
              localStorage.setItem('refreshToken', response.refreshToken);

              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${response.token}` },
              });
              return next(retryReq);
            }),
            catchError((refreshError) => {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              router.navigate(['/auth/login']);
              return throwError(() => refreshError);
            }),
          );
        }

        localStorage.removeItem('token');
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    }),
  );
};
