import { Injectable, signal, computed } from '@angular/core';
import { ProductResponse } from '../models/product.model';
import { jwtDecode } from 'jwt-decode';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  stock: number;
}

// Sepet localStorage'da kullanıcı bazlı tutulur.
// Key formatı: bookly_cart_{userId}
// Test için konsola yapıştır (tek satır olmalı):
// localStorage.setItem('bookly_cart_{SUB}', JSON.stringify([{"productId":"test-id","name":"TestKitap","price":100,"quantity":1}]))
// sub değerini almak için: const token = localStorage.getItem('token'); const decoded = JSON.parse(atob(token.split('.')[1]));
//console.log(decoded.sub)
@Injectable({ providedIn: 'root' })
export class CartService {
  private get STORAGE_KEY(): string {
    const token = localStorage.getItem('token');
    if (!token) return 'bookly_cart_guest';
    const decoded: any = jwtDecode(token);
    return `bookly_cart_${decoded.sub}`;
  }

  items = signal<CartItem[]>(this.loadFromStorage());

  totalAmount = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  totalItems = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));

  addToCart(product: ProductResponse): void {
    const current = this.items();
    const existing = current.find((i) => i.productId === product.id);
    const currentQuantity = existing ? existing.quantity : 0;

    if (currentQuantity >= product.stock) {
      alert('Yeterli stok yok.');
      return;
    }

    if (existing) {
      this.items.set(
        current.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i)),
      );
    } else {
      this.items.set([
        ...current,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageUrl: product.imageUrl,
          stock: product.stock,
        },
      ]);
    }

    this.saveToStorage();
  }

  removeFromCart(productId: string): void {
    this.items.set(this.items().filter((i) => i.productId !== productId));
    this.saveToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.items.set(this.items().map((i) => (i.productId === productId ? { ...i, quantity } : i)));
    this.saveToStorage();
  }

  clearCart(): void {
    this.items.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private loadFromStorage(): CartItem[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
  }
}
