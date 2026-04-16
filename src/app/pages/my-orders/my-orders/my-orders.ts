import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { MyOrderResponse } from '../../../core/models/order.model';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
})
export class MyOrders implements OnInit {
  private orderService = inject(OrderService);

  orders: MyOrderResponse[] = [];
  showOrdered = false;

  ngOnInit(): void {
    const state = history.state;
    if (state.ordered) {
      this.showOrdered = true;
      history.replaceState({}, '');
    }

    this.orderService.getMyOrders().subscribe({
      next: (res) => (this.orders = res),
    });
  }
}
