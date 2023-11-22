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
    path: 'settings',
    loadComponent: () =>
      import('./setting/setting.component').then((m) => m.SettingComponent),
    title: 'Setting',
    canMatch: [authGuard],
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.routes'),
    title: 'Editor',
    canMatch: [authGuard],
  },
  {
    path: 'article/:slug',
    loadComponent: () =>
      import('./article-detail/article-detail.component').then(
        (m) => m.ArticleDetailComponent
      ),
  },
  {
    path: ':username',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    title: 'Profile',
    canMatch: [authGuard],
  },
];
