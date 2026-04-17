import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { CreateProductRequest, UpdateProductRequest } from '../../../../core/models/product.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../../../core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from '../../../../core/services/category.service';
import { CategoryResponse } from '../../../../core/models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [
    Button,
    InputNumber,
    Select,
    ReactiveFormsModule,
    RouterLink,
    ToastModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  providers: [MessageService],
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private categoryService = inject(CategoryService);

  productId: string | null = null;
  categories: CategoryResponse[] = [];
  isEditMode = false;
  imageUrl: string | null = null;
  isUploading = false;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoryId: ['', Validators.required],
  });

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (res) => (this.categories = res),
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    this.productId = id;

    if (id) {
      this.productService.getById(id).subscribe({
        next: (res) => {
          this.form.patchValue({
            name: res.name,
            author: res.author,
            price: res.price,
            stock: res.stock,
            categoryId: res.categoryId,
          });
          this.imageUrl = res.imageUrl || null;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Ürün bilgileri yüklenemedi' });
        },
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.isUploading = true;

    this.productService.uploadImage(file).subscribe({
      next: (res) => {
        this.imageUrl = res.url;
        this.isUploading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Görsel yüklenemedi' });
        this.isUploading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.isEditMode) {
      const data: UpdateProductRequest = {
        id: this.productId!,
        ...this.form.getRawValue(),
        imageUrl: this.imageUrl || '',
      };
      this.productService.update(data).subscribe({
        next: () => {
          this.router.navigate(['/admin/products'], { state: { updated: true } });
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: err.error?.message || 'Ürün güncellenemedi' });
        },
      });
    } else {
      const data: CreateProductRequest = {
        ...this.form.getRawValue(),
        imageUrl: this.imageUrl || undefined,
      };
      this.productService.create(data).subscribe({
        next: () => {
          this.router.navigate(['/admin/products'], { state: { created: true } });
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Hata', detail: err.error?.message || 'Ürün oluşturulamadı' });
        },
      });
    }
  }
}
