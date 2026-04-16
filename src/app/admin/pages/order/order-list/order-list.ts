import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { AllOrderResponse } from '../../../../core/models/order.model';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, TableModule, SelectModule, FormsModule, ToastModule],
  templateUrl: './order-list.html',
  providers: [MessageService],
})
export class OrderList implements OnInit {
  private orderService = inject(OrderService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  orders: AllOrderResponse[] = [];
  statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.cdr.detectChanges();
      },
    });
  }

  onStatusChange(order: AllOrderResponse, newStatus: string): void {
    this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
      next: () => {
        order.status = newStatus;
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Sipariş durumu güncellendi',
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: err.error?.message || 'Güncelleme başarısız',
        });
      },
    });
  }
}
