import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProductResponse } from '../../../core/models/product.model';
import { CategoryResponse } from '../../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-listing',
  imports: [CommonModule, RouterLink],
  templateUrl: './items-listing.html',
  styleUrl: './items-listing.css',
})
export class ItemsListing implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);
  cartService = inject(CartService);

  allProducts: ProductResponse[] = [];
  products: ProductResponse[] = [];
  categories: CategoryResponse[] = [];
  selectedCategoryId: string | null = null;

  ngOnInit(): void {
    this.productService.getALL().subscribe({
      next: (res) => {
        this.allProducts = res;
        this.products = res;
        this.cdr.detectChanges();
      },
    });

    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res;
        this.cdr.detectChanges();
      },
    });
  }

  filterByCategory(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    if (!categoryId) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter((p) => p.categoryId === categoryId);
    }
    this.cdr.detectChanges();
  }
}
