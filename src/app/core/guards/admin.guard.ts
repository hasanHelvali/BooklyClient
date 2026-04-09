import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  const decoded: any = jwtDecode(token);
  const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const roles: string[] = Array.isArray(role) ? role : [role];

  if (roles.some((r) => r.toLowerCase() === 'admin')) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
