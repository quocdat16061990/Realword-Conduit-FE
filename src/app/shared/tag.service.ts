import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagApiResponse } from './models';
@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseURL: string = 'https://localhost:7104/api/Article';
  constructor(private http: HttpClient) { }

  getTags(): Observable<TagApiResponse> {
    return this.http.get<TagApiResponse>(`${this.baseURL}/tags`)
  }
}
