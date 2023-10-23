import { Injectable, inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth/auth.store';

export const authGuard: CanMatchFn = () => {
  debugger;
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAuthenticated) {
    return true;
  } else {
    return router.createUrlTree(['login']);
  }
};

export const nonAuthGuard: CanMatchFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAuthenticated) {
    return router.createUrlTree(['']);
  } else {
    return true;
  }
};
