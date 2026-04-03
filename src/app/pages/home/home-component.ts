import { Component } from '@angular/core';
import { BillboardComponent } from './billboard-component/billboard-component';
import { CompanyServices } from './company-services/company-services';
import { BestSellingItems } from './best-selling-items/best-selling-items';
import { LimitedOffer } from './limited-offer/limited-offer';
import { ItemsListing } from './items-listing/items-listing';
import { Categories } from './categories/categories';
import { CustomersReviews } from './customers-reviews/customers-reviews';
import { LatestPosts } from './latest-posts/latest-posts';
import { Social } from './social/social';

@Component({
  selector: 'app-home-component',
  imports: [
    BillboardComponent,
    CompanyServices,
    BestSellingItems,
    LimitedOffer,
    ItemsListing,
    Categories,
    CustomersReviews,
    LatestPosts,
    Social,
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {}
