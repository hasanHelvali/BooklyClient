import { AfterViewInit, Component } from '@angular/core';
declare const Swiper: any;
@Component({
  selector: 'app-testimonial-swiper',
  imports: [],
  templateUrl: './testimonial-swiper.html',
  styleUrl: './testimonial-swiper.css',
})
export class TestimonialSwiper implements AfterViewInit {
  ngAfterViewInit(): void {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.testimonial-button-next',
        prevEl: '.testimonial-button-prev',
      },
    });
  }
}
