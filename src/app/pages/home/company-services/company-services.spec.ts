import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyServices } from './company-services';

describe('CompanyServices', () => {
  let component: CompanyServices;
  let fixture: ComponentFixture<CompanyServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
