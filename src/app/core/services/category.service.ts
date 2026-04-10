import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { CreateProductRequest, ProductResponse } from '../models/product.model';
import { Observable } from 'rxjs';
import { CreateCategoryRequest, CreateCategoryResponse } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private categoryUrl = `${environment.apiUrl}/Categories`;

  create(request: CreateCategoryRequest): Observable<CreateCategoryResponse> {
    return this.http.post<CreateCategoryResponse>(`${this.categoryUrl}/CreateCategory`, request);
  }
}
