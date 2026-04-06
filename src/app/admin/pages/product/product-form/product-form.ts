import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { CreateProductRequest } from '../../../../core/models/product.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../../../core/services/product.service';
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
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  providers: [MessageService],
  /* Standalone component'lerde servisler otomatik inject edilemiyor — component'e özel olarak tanımlaman gerekiyor.

  MessageService PrimeNG'nin toast servisdi. providedIn: 'root' ile tanımlı değil, bu yüzden kullanacağın component'in
  providers dizisine ekliyorsun.

  Yani: "Bu component için MessageService'in bir instance'ını oluştur" demiş oluyorsun. */
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  ngOnInit(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Test',
      detail: 'Toast çalışıyor',
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;
    if (id) {
      this.productService.getById(id).subscribe({
        next: (res) => {
          this.form.patchValue({
            name: res.name,
            author: res.author,
            price: res.price,
            stock: res.stock,
            category: res.category,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Ürün bilgileri yüklenemedi',
          });
          console.error(err);
        },
      });
    }
  }

  isEditMode = false;
  categories = [
    { label: 'Roman', value: 'Roman' },
    { label: 'Tarih', value: 'Tarih' },
    { label: 'Fen', value: 'Fen' },
    { label: 'Felsefe', value: 'Felsefe' },
    { label: 'Mantık', value: 'Mantık' },
  ];

  form = this.fb.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.getRawValue() as CreateProductRequest;
    this.productService.create(data).subscribe({
      next: () => this.router.navigate(['/admin/products']),
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ürün oluşturulamadı',
        });
        console.error('Product creation failed:', err);
      },
    });
  }
}
