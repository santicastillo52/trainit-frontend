import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserRegister } from '../../models/user.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  //Sirve para saber si el usuario esta logeado
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private  http = inject(HttpClient);

  login(user: { email: string; password: string }): Observable<any> {
  
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/auth/login`, user).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('userId', response.user.id);
          

          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  register(user: UserRegister){
    return this.http.post(`${this.apiUrl}/auth/register`, user).pipe(
      tap(response => {
        if (response) {
          console.log('Usuario registrado');
        }
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; 
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe({
      next: () => {

        this.cleanupLocalStorage();
      },
      error: (error) => {

        this.cleanupLocalStorage();
      }
    });
  }
  
  private cleanupLocalStorage(): void {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }



  private hasToken(): boolean {
    return !!localStorage.getItem('token'); 
  }
}
