import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserAPIResponse } from './models/user.model';

export type LoginBodyRequest = Pick<User, 'email'> & { password: string };

@Injectable({
  providedIn: 'root',
})
export class UserAndAuthService {
  private baseURL: string = 'https://localhost:7104/api/User';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<UserAPIResponse> {
    return this.http.post<UserAPIResponse>(`${this.baseURL}/register`, user);
  }
  login(user: LoginBodyRequest): Observable<UserAPIResponse> {
    return this.http.post<UserAPIResponse>(`${this.baseURL}/login`, user);
  }
}
