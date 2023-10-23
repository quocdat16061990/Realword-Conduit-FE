import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginBodyRequest, UserAndAuthService } from '../../services';
import { User } from '../../models';
import { StorageKey } from '../constant/storage.key';
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly authService = inject(UserAndAuthService);
  private currentUser$ = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem(StorageKey.user)!)
      ? JSON.parse(localStorage.getItem(StorageKey.user)!)
      : null
  );
  private isAuthenticated$ = new BehaviorSubject<boolean>(
    !!JSON.parse(localStorage.getItem(StorageKey.user)!)
  );

  get isAuthenticated() {
    return this.isAuthenticated$.asObservable();
  }
  get currentUser() {
    return this.currentUser$.asObservable();
  }

  login(user: User) {
    this.authService.login(user).subscribe({
      next: (res) => {
        localStorage.setItem(StorageKey.user, JSON.stringify(res));
        this.currentUser$.next(user);
        this.isAuthenticated$.next(true);
      },
    });
  }
  logout(user: User) {
    this.authService.login(user).subscribe({
      next: (res) => {
        localStorage.setItem(StorageKey.user, JSON.stringify(res));
      },
    });
  }
}
