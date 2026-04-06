import { Component } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [Button, RouterLink, CurrencyPipe, ButtonModule, TableModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = [
    { id: 1, name: 'ABC', author: 'drf', price: 100, stock: 10, category: 'novel' },
    { id: 2, name: 'ABC', author: 'drf', price: 100, stock: 10, category: 'novel' },
    { id: 3, name: 'ABC', author: 'drf', price: 100, stock: 10, category: 'novel' },
  ];
}
