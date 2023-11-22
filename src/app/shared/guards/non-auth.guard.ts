import { Injectable, inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth/auth.store';
import { map } from 'rxjs';
export const nonAuthGuard: CanMatchFn = () => {
  const authStore = inject(AuthStore);
  console.log(authStore);
  const router = inject(Router);
  return authStore.isAuthenticated.pipe(
    map((isAuth) => {
      if (isAuth) {
        return router.createUrlTree(['']);
      } else {
        return true;
      }
    })
  );
};
