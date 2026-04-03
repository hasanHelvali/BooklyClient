import { AfterViewInit, Component } from '@angular/core';
declare const Swiper: any;
@Component({
  selector: 'app-best-selling-items',
  imports: [],
  templateUrl: './best-selling-items.html',
  styleUrl: './best-selling-items.css',
})
export class BestSellingItems implements AfterViewInit {
  ngAfterViewInit(): void {
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
  }
}
