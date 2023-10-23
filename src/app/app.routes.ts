import { Routes } from '@angular/router';
import { authGuard, nonAuthGuard } from './shared/guards';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    title: 'Sign-in',
    canMatch: [nonAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
    title: 'Sign-up',
    canMatch: [nonAuthGuard],
  },

  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'setting',
    loadComponent: () =>
      import('./setting/setting.component').then((m) => m.SettingComponent),
    title: 'Setting',
    canMatch: [authGuard],
  },
];
