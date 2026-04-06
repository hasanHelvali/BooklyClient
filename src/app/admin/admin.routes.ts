import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AdminLayout } from './layout/admin-layout/admin-layout';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/product/product-list/product-list').then((m) => m.ProductList),
      },
      {
        path: 'products/add',
        loadComponent: () =>
          import('./pages/product/product-form/product-form').then((m) => m.ProductForm),
      },
      {
        path: 'products/edit/:id',
        loadComponent: () =>
          import('./pages/product/product-form/product-form').then((m) => m.ProductForm),
      },
    ],
  },
];
