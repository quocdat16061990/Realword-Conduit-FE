import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthStore } from '../store/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthStore).getCurrentUser()?.accessToken;
  if (req.url.includes('/api/') && !req.headers.has('Authorization') && token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
