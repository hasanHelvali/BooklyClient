import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInRequest, SignUpRequest } from '../../../core/models/auth.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ButtonModule, InputTextModule, PasswordModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[0-9]).{6,}$')], // pattern('^(?=.*[0-9]).{6,}$') → en az 6 karakter VE en az 1 rakam zorunlu.
    ],
  });

  isSignIn = true;
  toggleForm() {
    this.isSignIn = !this.isSignIn;
  }

  onSignIn() {
    if (this.signInForm.valid) {
      const data: SignInRequest = this.signInForm.value as SignInRequest;
      this.authService.login(data).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          const decoded: any = jwtDecode(response.token);
          const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          if (role === 'Admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
          this.router.navigate(['/admin/dashboard']);
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Giriş başarılı.',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Başarısız',
            detail: 'Giriş Başarısız.',
          });
          console.error('Login failed:', error);
        },
      });
    }
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const data: SignUpRequest = this.signUpForm.getRawValue();
      this.authService.register(data).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Kayıt başarılı.',
          });
          this.isSignIn = true;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Başarısız',
            detail: 'Kayıt başarısız.',
          });
        },
      });
    }
  }
}
