import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layouts/main-layout-component/main-layout-component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home-component').then((m) => m.HomeComponent),
      },
    ],
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes) },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) },
];
