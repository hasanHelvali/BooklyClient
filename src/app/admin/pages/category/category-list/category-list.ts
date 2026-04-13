import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { CategoryService } from '../../../../core/services/category.service';
import { MessageService } from 'primeng/api';
import { CategoryResponse } from '../../../../core/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [ButtonModule, TableModule, RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {
  private categoryService = inject(CategoryService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  categories: CategoryResponse[] = [];

  ngOnInit(): void {
    const state = history.state;
    if (state.created) {
      this.messageService.add({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Kategori oluşturuldu',
      });
      history.replaceState({}, '');
    }

    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res;
        this.cdr.detectChanges();
      },

      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Kategoriler yüklenemedi',
        });
      },
    });
  }

  onDelete(id: string): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categories = this.categories.filter((c) => c.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Kategori silindi',
        });
        this.cdr.detectChanges();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Kategori silinemedi',
        });
      },
    });
  }
}
