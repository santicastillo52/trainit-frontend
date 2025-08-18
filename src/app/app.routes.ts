import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },

  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  { path: '**', 
    redirectTo: 'auth/login'
  }
];
