import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Component, inject } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { CartService } from '../../../core/services/cart.service';
/*Kullanıcı sepetteki ürünleri görüp siparişi onaylayacağı sayfa. Sepet içeriğini listeler, toplam tutarı gösterir, "Siparişi
  Tamamla" butonuna basınca CreateOrder endpoint'ini çağırır. */
@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ButtonModule, ToastModule],
  templateUrl: './checkout.html',
  providers: [MessageService],
})
export class Checkout {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  isSubmitting = false;

  placeOrder(): void {
    if (this.cartService.items().length === 0) return;

    this.isSubmitting = true;

    const request = {
      items: this.cartService.items().map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
    };

    this.orderService.createOrder(request).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/my-orders'], { state: { ordered: true } }).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: err.error?.message || 'Sipariş oluşturulamadı',
        });
      },
    });
  }
}
