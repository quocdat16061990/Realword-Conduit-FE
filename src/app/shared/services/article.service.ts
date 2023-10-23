import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticlePagingAPIResponse, PagingQueryParams } from '../models';

export type ArticleGlobalQueryParams = PagingQueryParams & {
  tag?: string;
  author?: string;
  favorited?: string;
};
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseURL: string = 'https://localhost:7104/api/Article';
  constructor(private http: HttpClient) {}

  getArticleGlobal(
    request: ArticleGlobalQueryParams
  ): Observable<ArticlePagingAPIResponse> {
    return this.http.get<ArticlePagingAPIResponse>(`${this.baseURL}/global`, {
      params: { ...request },
    });
  }
}
