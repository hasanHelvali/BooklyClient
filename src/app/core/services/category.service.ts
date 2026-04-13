import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { CreateProductRequest, ProductResponse } from '../models/product.model';
import { Observable } from 'rxjs';
import {
  CategoryResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
} from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private categoryUrl = `${environment.apiUrl}/Categories`;

  create(request: CreateCategoryRequest): Observable<CreateCategoryResponse> {
    return this.http.post<CreateCategoryResponse>(`${this.categoryUrl}/CreateCategory`, request);
  }

  getAll(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${this.categoryUrl}/GetAllCategories`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.categoryUrl}/DeleteCategoryById/${id}`);
  }
  update(request: UpdateCategoryRequest): Observable<any> {
    return this.http.put(`${this.categoryUrl}/UpdateCategory`, request);
  }
  getById(id: string): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.categoryUrl}/GetCategoryById/${id}`);
  }
}
