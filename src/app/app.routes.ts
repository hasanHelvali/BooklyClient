import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch: 'full'}, // boş path'e gelindiğinde otomatik olarak /home'a yönlendir
    { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes) },
    { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes) }
];
