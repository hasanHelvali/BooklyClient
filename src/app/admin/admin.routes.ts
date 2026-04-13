import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { adminGuard } from '../core/guards/admin.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivate: [adminGuard],
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
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/category/category-list/category-list').then((m) => m.CategoryList),
      },
      {
        path: 'categories/add',
        loadComponent: () =>
          import('./pages/category/category-form/category-form').then((m) => m.CategoryForm),
      },
      {
        path: 'categories/edit/:id',
        loadComponent: () =>
          import('./pages/category/category-form/category-form').then((m) => m.CategoryForm),
      },
    ],
  },
];
