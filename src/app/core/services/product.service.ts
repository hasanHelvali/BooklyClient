import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { CreateProductRequest, ProductResponse } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productUrl = `${environment.apiUrl}/Products`;

  create(request: CreateProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.productUrl}/CreateProduct`, request);
  }

  getALL(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.productUrl}/GetAllProducts`);
  }

  getById(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.productUrl}/GetProductById/${id}`);
  }
}
