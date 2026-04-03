import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingItems } from './best-selling-items';

describe('BestSellingItems', () => {
  let component: BestSellingItems;
  let fixture: ComponentFixture<BestSellingItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellingItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSellingItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
