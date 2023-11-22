import { Injectable, inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth/auth.store';
import { map } from 'rxjs';
export const authGuard: CanMatchFn = () => {
  const authStore = inject(AuthStore);
  console.log('authStore', authStore);
  const router = inject(Router);
  return authStore.isAuthenticated.pipe(
    map((isAuth) => {
      if (isAuth) {
        return true;
      } else {
        return router.createUrlTree(['login']);
      }
    })
  );
};
