import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }


  editUser(userId: string, user: User): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${userId}`, user);
  }
  
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
