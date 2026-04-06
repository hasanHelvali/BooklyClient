import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, MenuModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/admin/dashboard' },
    { label: 'Ürünler', icon: 'pi pi-book', routerLink: '/admin/products' },
    { label: 'Kategoriler', icon: 'pi pi-tags', routerLink: '/admin/categories' },
    { label: 'Siparişler', icon: 'pi pi-shopping-cart', routerLink: '/admin/orders' },
  ];
}
