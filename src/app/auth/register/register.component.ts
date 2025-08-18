import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User, UserRegister } from '../../core/models/user.model';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private alertService = inject(AlertsService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  userForm!: FormGroup;
  isSubmitting: boolean = false;
  messageButton: string = 'Registrarse';

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)]),
      repeatPassword: new FormControl('', [Validators.required]),
    });
  }

  register() {
    if (this.userForm.valid && !this.isSubmitting) {
      const user: UserRegister = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      };

      this.isSubmitting = true;
      this.messageButton = 'Registrando usuario...';

      this.authService.register(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.alertService.success('Usuario registrado correctamente');
            this.resetForm();
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            const errorMessage = error.error?.message || 'Error al registrar el usuario';
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
    this.messageButton = 'Registrarse';
  }

  passwordDoNotMatch(){
    return this.userForm.get('password')?.value !== this.userForm.get('repeatPassword')?.value;
  }
}
