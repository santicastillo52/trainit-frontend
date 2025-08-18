import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../../core/services/users/users.service';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly usersService = inject(UsersService);
  private readonly alertsService = inject(AlertsService);
  private readonly destroy$ = new Subject<void>();

  editForm!: FormGroup;
  userId: string = '';
  user: User | null = null;
  isSubmitting = false;

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.loadUserFromState();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    
    if (this.user) {
      this.editForm.patchValue({
        name: this.user.name,
        email: this.user.email
      });
    }
  }

  private loadUserFromState(): void {
    const userData = history.state?.user;
    if (userData) {
      this.user = userData as User;
      
    } else {
      this.alertsService.error('No se encontró usuario');
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.user) {
      this.isSubmitting = true;
      
      const updatedUser = {
        ...this.user,
        name: this.editForm.value.name,
        email: this.editForm.value.email
      };

      this.usersService.editUser(this.userId, updatedUser).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.alertsService.success('Usuario actualizado correctamente');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.alertsService.error('Error al actualizar el usuario');
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
