import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { User } from '../../core/models/user.model';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from '../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit, OnDestroy {

  private readonly usersService = inject(UsersService);
  private alertService = inject(AlertsService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  
  users: User[] = [];
  
  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUsers(): void {
    this.usersService.getUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.users = response;
        
      },
      error: (error: any) => {
        this.alertService.error('Error al obtener los usuarios');

      }
    });
  }

  editUser(user: User): void {
    this.router.navigate(['/users/edit', user.id], {
      state: { user: user }
    });
  }

  async deleteUser(userId: string){
    const confirmed = await this.alertService.delete();

    if(confirmed){
      if(userId){
        this.usersService.deleteUser(userId).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: () => {
            this.alertService.success('Usuario eliminado correctamente');
            this.getUsers();
          },
          error: (error: any) => {
            this.alertService.error('Error al eliminar el usuario');
          }
        })
      }
    }   
  }
}
