import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersReviews } from './customers-reviews';

describe('CustomersReviews', () => {
  let component: CustomersReviews;
  let fixture: ComponentFixture<CustomersReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
