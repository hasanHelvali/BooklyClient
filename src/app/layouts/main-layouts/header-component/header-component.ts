import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  cartService = inject(CartService);
  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
