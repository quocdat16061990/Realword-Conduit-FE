// profile.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../shared/models';
import { AuthStore } from '../shared/store/auth';
import { ArticleGlobalQueryParams, ArticleService } from '../shared/services';
import { map } from 'rxjs/operators';
import { ArticleListComponent } from '../shared/ui/article-list/article-list.component';
import { ArticleFavouriteAPIRequest } from '../shared/models';

import {
  FeedToogleComponent,
  TabTitle,
} from './feed-toogle/feed-toogle.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ArticleListComponent,
    FeedToogleComponent,
    NgbNavModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any;
  articleList: Article[] = [];
  currentTab: string = TabTitle.myArticles;

  readonly #authStore = inject(AuthStore);
  readonly #articleService = inject(ArticleService);

  ngOnInit(): void {
    this.fetchDataMyArticle();
  }

  onToggle(title: string) {
    if (title === TabTitle.myArticles) {
      this.fetchDataMyArticle();
    }
    if (title === TabTitle.favouritesArticles) {
      this.fetchDataFavouriteArticles();
    }
  }

  private fetchDataMyArticle() {
    const queryParams: ArticleGlobalQueryParams = {
      limit: 30,
      offset: 0,
      author: this.#authStore.getCurrentUser()!.username,
    };

    this.#articleService.getArticleGlobal(queryParams).subscribe((data) => {
      this.articleList = data.items;
    });
  }

  private fetchDataFavouriteArticles() {
    const queryParams: ArticleGlobalQueryParams = {
      limit: 30,
      offset: 0,
      favourited: this.#authStore.getCurrentUser()!.username,
    };

    this.#articleService.getArticleGlobal(queryParams).subscribe((data) => {
      this.articleList = data.items;
    });
  }
}
