import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitedOffer } from './limited-offer';

describe('LimitedOffer', () => {
  let component: LimitedOffer;
  let fixture: ComponentFixture<LimitedOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitedOffer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitedOffer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
