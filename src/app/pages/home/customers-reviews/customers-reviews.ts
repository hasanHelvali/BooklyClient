import { Component } from '@angular/core';
import { TestimonialSwiper } from './testimonial-swiper/testimonial-swiper';

@Component({
  selector: 'app-customers-reviews',
  imports: [TestimonialSwiper],
  templateUrl: './customers-reviews.html',
  styleUrl: './customers-reviews.css',
})
export class CustomersReviews {}
