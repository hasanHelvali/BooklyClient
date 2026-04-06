import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductResponse } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  imports: [Button, RouterLink, CurrencyPipe, ButtonModule, TableModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  providers: [MessageService],
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
  products: ProductResponse[] = [];
  ngOnInit(): void {
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
}
