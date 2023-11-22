import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from 'src/app/app.config';

import { User, UpdateBodyRequest } from '../models/user.model';

export type LoginBodyRequest = Pick<User, 'email'> & { password: string };
export type RegisterBodyRequest = Pick<User, 'email' | 'username'> & {
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserAndAuthService {
  appConfig = inject(APP_CONFIG);
  readonly #httpClient = inject(HttpClient);

  register(user: RegisterBodyRequest): Observable<User> {
    return this.#httpClient.post<User>(
      `${this.appConfig.apiURL}/User/register`,
      user
    );
  }
  getUser(
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
      | undefined
  ) {
    return this.#httpClient.get<User>(
      `${this.appConfig.apiURL}/User/current-user`,
      { headers }
    );
  }
  login(user: LoginBodyRequest): Observable<User> {
    return this.#httpClient.post<User>(
      `${this.appConfig.apiURL}/User/login`,
      user
    );
  }
  update(
    request: UpdateBodyRequest,
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        }
      | undefined
  ) {
    return this.#httpClient.put<User>(
      `${this.appConfig.apiURL}/User`,
      request,
      {
        headers,
      }
    );
  }
  followUser(username: string) {
    return this.#httpClient.post<User>(
      `${this.appConfig.apiURL}/User/${username}/follow`,
      {},
      {}
    );
  }
  unFollowUser(username: string) {
    return this.#httpClient.delete<User>(
      `${this.appConfig.apiURL}/User/${username}/unFollow`
    );
  }
}
