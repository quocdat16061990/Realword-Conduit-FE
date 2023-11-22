import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize, take } from 'rxjs';
import { LoginBodyRequest, UserAndAuthService } from '../../services';
import { UpdateBodyRequest, User } from '../../models';
import { StorageKey } from '../constant/storage.key';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Toast, ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly authService = inject(UserAndAuthService);
  private toastr = inject(ToastrService);
  readonly #router = inject(Router);
  private currentUser$ = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem(StorageKey.user)!)
      ? JSON.parse(localStorage.getItem(StorageKey.user)!)
      : null
  );
  private isAuthenticated$ = new BehaviorSubject<boolean>(
    !!JSON.parse(localStorage.getItem(StorageKey.user)!)
  );
  formStatus: 'pending' | 'done' = 'done';
  get isAuthenticated() {
    return this.isAuthenticated$.asObservable();
  }
  get currentUser() {
    return this.currentUser$.asObservable();
  }
  getIsAuthenticated() {
    return this.isAuthenticated$.value;
  }
  getCurrentUser() {
    return this.currentUser$.value;
  }
  login(user: LoginBodyRequest) {
    this.authService.login(user).subscribe({
      next: (res) => {
        localStorage.setItem(StorageKey.user, JSON.stringify(res));

        this.currentUser$.next(res);
        this.isAuthenticated$.next(true);
      },
    });
  }
  update(updateUser: UpdateBodyRequest) {
    this.formStatus = 'pending';
    this.currentUser
      .pipe(
        take(1),
        switchMap((user) => {
          const accessToken = user!.accessToken;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };

          return this.authService.update(updateUser, headers);
        })
      )
      .pipe(finalize(() => (this.formStatus = 'done')))
      .subscribe({
        next: (res) => {
          this.toastr.success('Cập Nhật Thành Công');
          this.currentUser$.next(res);
          localStorage.setItem(StorageKey.user, JSON.stringify(res));
        },
        error: () => {
          this.toastr.error('Lỗi');
        },
      });
  }
  logout() {
    this.currentUser$.next(null);
    this.isAuthenticated$.next(false);
    localStorage.removeItem(StorageKey.user);
    this.#router.navigate(['']);
  }
}
