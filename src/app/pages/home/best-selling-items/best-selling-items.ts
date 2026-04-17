import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductResponse } from '../../../core/models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
declare const Swiper: any;
@Component({
  selector: 'app-best-selling-items',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './best-selling-items.html',
  styleUrl: './best-selling-items.css',
})
export class BestSellingItems implements OnInit {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  cartService = inject(CartService);

  products: ProductResponse[] = [];

  ngOnInit(): void {
    this.productService.getBestSelling(10).subscribe({
      next: (res) => {
        this.products = res;
        this.cdr.detectChanges();
        setTimeout(() => {
          new Swiper('.product-swiper', {
            spaceBetween: 20,
            navigation: {
              nextEl: '.product-slider-button-next',
              prevEl: '.product-slider-button-prev',
            },
            breakpoints: {
              0: { slidesPerView: 1 },
              660: { slidesPerView: 3 },
              980: { slidesPerView: 4 },
              1500: { slidesPerView: 5 },
            },
          });
        }, 100);
      },
    });
  }
}
