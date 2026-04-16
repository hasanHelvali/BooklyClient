import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserRoleRequest, UserResponse } from '../models/user.model';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/Users`;
  private readonly http = inject(HttpClient);

  getAll(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.API_URL}/GetAllUsers`);
  }

  updateRole(request: UpdateUserRoleRequest): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.API_URL}/UpdateUserRole`, request);
  }
}
