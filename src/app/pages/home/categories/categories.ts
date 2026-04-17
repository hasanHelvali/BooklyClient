import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryResponse } from '../../../core/models/category.model';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  categories: CategoryResponse[] = [];

  scrollToProducts(): void {
    document.getElementById('items-listing')?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res;
        this.cdr.detectChanges();
      },
    });
  }
}
