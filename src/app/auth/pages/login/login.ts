import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInRequest, SignUpRequest } from '../../../core/models/auth.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ButtonModule, InputTextModule, PasswordModule, ReactiveFormsModule],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  signUpForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
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
      const data = this.signInForm.value as SignInRequest;
      console.log('Sign In:', data);
    }
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const data = this.signUpForm.value as SignUpRequest;
      console.log('Sign Up:', data);
    }
  }
}
