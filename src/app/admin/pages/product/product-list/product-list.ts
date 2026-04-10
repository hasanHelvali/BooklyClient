import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductResponse } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  imports: [Button, RouterLink, CurrencyPipe, ButtonModule, TableModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  // products = [
  //   { id: 1, name: 'ABC', author: 'drf', price: 100, stock: 10, category: 'novel' },
  //   { id: 2, name: 'ABC', author: 'drf', price: 100, stock: 10, category: 'novel' },
  //   { id: 3, name: 'ABC', author: 'drf', price: 100, stock: 10, category: 'novel' },
  // ];

  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  products: ProductResponse[] = [];
  ngOnInit(): void {
    const state = history.state;
    if (state.created) {
      this.messageService.add({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Ürün oluşturuldu',
      });
      history.replaceState({}, ''); // Sayfa yenilendiğinde mesajın tekrar görünmesini engellemek için state'i temizliyoruz.
    }
    if (state.updated) {
      this.messageService.add({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Ürün güncellendi',
      });
      history.replaceState({}, ''); // Sayfa yenilendiğinde mesajın tekrar görünmesini engellemek için state'i temizliyoruz.
    }

    this.productService.getALL().subscribe({
      next: (res) => {
        this.products = res;
        this.cdr.detectChanges(); // Veriler geldikten sonra tabloyu güncellemek için değişiklik algılamayı tetikliyoruz.
        debugger;
        console.log(res);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ürünler yüklenemedi',
        });
        console.error('Failed to fetch products:', err);
      },
    });
    debugger;
  }

  onDelete(id: string): void {
    debugger;
    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Ürün silindi',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ürün silinemedi',
        });
        console.error('Failed to delete product:', err);
      },
    });
  }
}
