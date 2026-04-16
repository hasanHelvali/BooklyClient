import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { UserResponse } from '../../../../core/models/user.model';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [TableModule, ButtonModule, ToastModule, SelectModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  providers: [MessageService],
})
export class UserList implements OnInit {
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private cdr = inject(ChangeDetectorRef);

  users: UserResponse[] = [];
  roles = ['Admin', 'Customer'];

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res;
        this.cdr.detectChanges();
      },
    });
  }

  onRoleChange(user: UserResponse, newRole: string): void {
    this.userService.updateRole({ userId: user.id, role: newRole }).subscribe({
      next: () => {
        user.role = newRole;
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Rol güncellendi',
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: err.error?.message || 'Rol güncellenemedi',
        });
      },
    });
  }
}
