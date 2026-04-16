import { Component, inject } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, MenuModule, ButtonModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private authService = inject(AuthService);
  private router = inject(Router);
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/admin/dashboard' },
    { label: 'Ürünler', icon: 'pi pi-book', routerLink: '/admin/products' },
    { label: 'Kategoriler', icon: 'pi pi-tags', routerLink: '/admin/categories' },
    { label: 'Siparişler', icon: 'pi pi-shopping-cart', routerLink: '/admin/orders' },
    { label: 'Kullanıcılar', icon: 'pi pi-users', routerLink: '/admin/users' },
    { label: 'Siparişler', icon: 'pi pi-shopping-bag', routerLink: '/admin/orders' },
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
