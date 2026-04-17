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
      {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout/checkout').then((m) => m.Checkout),
      },
      {
        path: 'my-orders',
        loadComponent: () =>
          import('./pages/my-orders/my-orders/my-orders').then((m) => m.MyOrders),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
      },
    ],
  },
  //{ path: 'auth', loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes) },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) },
];
