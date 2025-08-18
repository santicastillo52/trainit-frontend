import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
