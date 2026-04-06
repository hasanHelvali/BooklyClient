import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-product-form',
  imports: [Button, InputNumber, Select, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
  }

  isEditMode = false;
  categories = [
    { label: 'Fiction', value: 'Fiction' },
    { label: 'Romance', value: 'Romance' },
    { label: 'Science', value: 'Science' },
    { label: 'History', value: 'History' },
  ];

  form = this.fb.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0)]],
    stock: [null, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    console.log(this.form.getRawValue());
    this.router.navigate(['/admin/products']);
  }
}
