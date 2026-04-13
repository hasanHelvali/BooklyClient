import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignInRequest, SignUpRequest, TokenResponse } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:5014/api/Auth';
  private readonly http = inject(HttpClient);

  login(request: SignInRequest): Observable<TokenResponse> {
    debugger;
    return this.http.post<TokenResponse>(`${this.API_URL}/Login`, request);
  }
  register(request: SignUpRequest): Observable<void> {
    debugger;
    return this.http.post<void>(`${this.API_URL}/Register`, request);
  }

  refreshToken(refreshToken: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API_URL}/RefreshToken`, { refreshToken });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
