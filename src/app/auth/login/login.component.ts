import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import {  UserLogin } from '../../core/models/user.model';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();

  userForm!: FormGroup;
  isSubmitting: boolean = false;
  messageButton: string = 'Iniciar sesión';

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.userForm.valid && !this.isSubmitting) {
      const user: UserLogin = {
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      };

      this.isSubmitting = true;
      this.messageButton = 'Iniciando sesión...';

      this.authService.login(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            const user = this.authService.getUser();
            this.resetForm();
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            const errorMessage = error.error?.message || 'Error en el login';
            this.alertService.error(errorMessage);
            this.resetForm();
          }
        });
    } else {
      this.alertService.error('Por favor, completa todos los campos requeridos');
    }
  }

  private resetForm() {
    this.isSubmitting = false;
    this.messageButton = 'Iniciar sesión';
  }
}


