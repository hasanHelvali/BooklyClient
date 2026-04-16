import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AllOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  MyOrderResponse,
} from '../models/order.model';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly API_URL = `${environment.apiUrl}/Orders`;
  private readonly http = inject(HttpClient);

  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(`${this.API_URL}/CreateOrder`, request);
  }

  getMyOrders(): Observable<MyOrderResponse[]> {
    return this.http.get<MyOrderResponse[]>(`${this.API_URL}/GetMyOrders`);
  }

  getAllOrders(): Observable<AllOrderResponse[]> {
    return this.http.get<AllOrderResponse[]>(`${this.API_URL}/GetAllOrders`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.API_URL}/UpdateOrderStatus`, {
      orderId,
      status,
    });
  }
}
