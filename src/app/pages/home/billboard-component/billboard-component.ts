import { AfterViewInit, Component } from '@angular/core';
declare const Swiper: any;

@Component({
  selector: 'app-billboard-component',
  imports: [],
  templateUrl: './billboard-component.html',
  styleUrl: './billboard-component.css',
})
export class BillboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    new Swiper('.main-swiper', {
      speed: 500,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: '.main-slider-button-next',
        prevEl: '.main-slider-button-prev',
      },
    });
  }
}
