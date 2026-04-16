export interface CreateOrderRequest {
  items: CreateOrderItemDto[];
}

export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderResponse {
  orderId: string;
  message: string;
}

export interface OrderItemDto {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface MyOrderResponse {
  id: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItemDto[];
}

export interface AllOrderResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  itemCount: number;
}
