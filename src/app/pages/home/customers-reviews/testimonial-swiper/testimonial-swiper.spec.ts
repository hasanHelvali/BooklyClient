import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialSwiper } from './testimonial-swiper';

describe('TestimonialSwiper', () => {
  let component: TestimonialSwiper;
  let fixture: ComponentFixture<TestimonialSwiper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialSwiper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialSwiper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
