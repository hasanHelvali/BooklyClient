import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ProductResponse } from '../../../core/models/product.model';

declare const Swiper: any;

@Component({
  selector: 'app-billboard-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './billboard-component.html',
  styleUrl: './billboard-component.css',
})
export class BillboardComponent implements OnInit {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  products: ProductResponse[] = [];
  fallbackImages = [
    'images/banner-image.png',
    'images/banner-image1.png',
    'images/banner-image2.png',
  ];

  ngOnInit(): void {
    this.productService.getALL().subscribe({
      next: (res) => {
        this.products = res.slice(0, 5);
        this.cdr.detectChanges();
        setTimeout(() => {
          new Swiper('.main-swiper', {
            speed: 500,
            autoplay: { delay: 3000 },
            navigation: {
              nextEl: '.main-slider-button-next',
              prevEl: '.main-slider-button-prev',
            },
          });
        }, 300);
      },
    });
  }
}
