import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header-component',
  imports: [CurrencyPipe, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  cartService = inject(CartService);

  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  registerForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get currentUserName(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const decoded: any = jwtDecode(token);
    return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.errorMessage = '';
        window.location.reload();
      },
      error: () => {
        this.errorMessage = 'Email veya şifre hatalı.';
      },
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: () => {
        this.errorMessage = '';
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      },
      error: () => {
        this.errorMessage = 'Kayıt başarısız.';
      },
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  get isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const decoded: any = jwtDecode(token);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const roles: string[] = Array.isArray(role) ? role : [role];
    return roles.some((r) => r.toLowerCase() === 'admin');
  }
}
