import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {
  ArticleAPIResponse,
  ArticlePagingAPIResponse,
  PagingQueryParams,
  ArticleAPIRequest,
  ArticleFavouriteAPIRequest,
  CommentAPIResponse,
  DeleteArticleAPIResponse,
  Article,
} from '../models';
import { APP_CONFIG } from 'src/app/app.config';

export type ArticleGlobalQueryParams = PagingQueryParams & {
  tag?: string;
  author?: string;
  favourited?: string;
};
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  appConfig = inject(APP_CONFIG);
  readonly #httpClient = inject(HttpClient);

  getArticleSlug(slug: string) {
    return this.#httpClient.get<Article>(
      `${this.appConfig.apiURL}/Article/${slug}`
    );
  }
  getArticleGlobal(
    request: ArticleGlobalQueryParams
  ): Observable<ArticlePagingAPIResponse> {
    return this.#httpClient.get<ArticlePagingAPIResponse>(
      `${this.appConfig.apiURL}/article/global`,
      {
        params: { ...request },
      }
    );
  }
  postArticle(request: ArticleAPIRequest): Observable<ArticleAPIResponse> {
    return this.#httpClient.post<ArticleAPIResponse>(
      `${this.appConfig.apiURL}/article`,
      request
    );
  }
  deleteArticle(slug: string): Observable<DeleteArticleAPIResponse> {
    return this.#httpClient.delete<DeleteArticleAPIResponse>(
      `${this.appConfig.apiURL}/article/${slug}`
    );
  }
  updateArticle(slug: string, body: any): Observable<ArticleAPIResponse> {
    return this.#httpClient.put<ArticleAPIResponse>(
      `${this.appConfig.apiURL}/article/${slug}`,
      body
    );
  }
  favouriteArticle(slug: string): Observable<ArticleAPIResponse> {
    return this.#httpClient.post<ArticleAPIResponse>(
      `${this.appConfig.apiURL}/article/${slug}/favourite`,
      {}
    );
  }
  unFavouriteArticle(slug: string): Observable<ArticleAPIResponse> {
    return this.#httpClient.delete<ArticleAPIResponse>(
      `${this.appConfig.apiURL}/article/${slug}/favourite`
    );
  }
  getComment(slug: string) {
    return this.#httpClient.get<CommentAPIResponse>(
      `${this.appConfig.apiURL}/Article/${slug}/comments`
    );
  }
  postComment(slug: string, body: string) {
    return this.#httpClient.post<CommentAPIResponse>(
      `${this.appConfig.apiURL}/Article/${slug}/comments`,
      body
    );
  }
  deleteComment(slug: string, id: string) {
    return this.#httpClient.delete<CommentAPIResponse>(
      `${this.appConfig.apiURL}/Article/${slug}/comments/${id}`
    );
  }
}
