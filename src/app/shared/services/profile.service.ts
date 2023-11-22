import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileAPIResponse } from '../models';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseURL: string = 'https://localhost:7104/api/User';
  readonly #httpClient = inject(HttpClient);
  getProfile(username: string): Observable<ProfileAPIResponse> {
    return this.#httpClient.get<ProfileAPIResponse>(
      `${this.baseURL}/profile/${username}`
    );
  }
}
