import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { UpdateCategoryRequest } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-form',
  imports: [InputTextModule, ButtonModule, RouterLink, ToastModule, ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
  providers: [MessageService],
})
export class CategoryForm implements OnInit {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  isEditMode = false;
  categoryId: string | null = null;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    this.categoryId = id;

    if (id) {
      this.categoryService.getById(id).subscribe({
        next: (res) => {
          this.form.patchValue({ name: res.name });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Kategori bilgileri yüklenemedi',
          });
        },
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.isEditMode) {
      const data: UpdateCategoryRequest = { id: this.categoryId!, ...this.form.getRawValue() };
      this.categoryService.update(data).subscribe({
        next: () => {
          this.router.navigate(['/admin/categories'], { state: { updated: true } });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: err.error?.message || 'Kategori güncellenemedi',
          });
        },
      });
    } else {
      this.categoryService.create(this.form.getRawValue()).subscribe({
        next: () => {
          this.router.navigate(['/admin/categories'], { state: { created: true } });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: err.error?.message || 'Kategori oluşturulamadı',
          });
        },
      });
    }
  }
}
