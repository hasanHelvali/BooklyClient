import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListing } from './items-listing';

describe('ItemsListing', () => {
  let component: ItemsListing;
  let fixture: ComponentFixture<ItemsListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
