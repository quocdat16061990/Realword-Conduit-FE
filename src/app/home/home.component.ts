import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FeedToogleComponent,
  TabItem,
} from './ui/feed-toogle/feed-toogle.component';
import { TagsComponent } from './ui/tags/tags.component';
import { ArticleListComponent } from '../shared/ui/article-list/article-list.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  Article,
  ArticleAPIRequest,
  ArticleFavouriteAPIRequest,
} from '../shared/models';
import { ArticleGlobalQueryParams, ArticleService } from '../shared/services';
import { AuthStore } from '../shared/store/auth';
import { ToastrService } from 'ngx-toastr';

import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FeedToogleComponent,
    TagsComponent,
    ArticleListComponent,
    NgbNavModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  articleList: Article[] = [];
  tabItems: TabItem[] = [];
  readonly #authStore = inject(AuthStore);
  readonly #articleService = inject(ArticleService);
  readonly destroySubject$ = new Subject<void>();
  slug: any = '';
  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    if (this.#authStore.getIsAuthenticated()) {
      this.tabItems = [{ title: 'Global Feed' }, { title: 'Your Feed' }];
    } else {
      this.tabItems = [{ title: 'Global Feed' }];
    }
  }
  onToggle(title: string) {
    if (title === 'Global Feed') {
      this.fetchGlobalFeed();
    } else if (title === 'Your Feed') {
      this.fetchYourFeed();
    } else {
      this.fetchYourTags(title.substring(1));
    }
  }
  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
  fetchGlobalFeed() {
    const queryParams: ArticleGlobalQueryParams = {
      limit: 30,
      offset: 0,
    };
    this.#articleService.getArticleGlobal(queryParams).subscribe((data) => {
      this.articleList = data.items;
      this.articleList.map((item: any) => {
        this.slug = item.slug;
      });
    });
  }

  fetchYourFeed() {
    const queryParams: ArticleGlobalQueryParams = {
      limit: 30,
      offset: 0,
    };
    this.#articleService
      .getArticleGlobal(queryParams)
      .pipe(
        map((data) => {
          data.items = data.items.filter(
            (x) =>
              x.author.username === this.#authStore.getCurrentUser()!.username
          );
          return data;
        })
      )
      .subscribe((data) => {
        this.articleList = data.items;
      });
  }

  selectTag(tag: string): void {
    let tabItem = this.tabItems.find((item) => item.title.startsWith('#'));
    if (tabItem) {
      tabItem.title = `#${tag}`;
    } else {
      this.tabItems.push({ title: `#${tag}` });
    }
    this.tabItems = [...this.tabItems];
  }
  fetchYourTags(tagTitle: string): void {
    const queryParams: ArticleGlobalQueryParams = {
      limit: 30,
      offset: 0,
      tag: tagTitle,
    };

    this.#articleService.getArticleGlobal(queryParams).subscribe((data) => {
      this.articleList = data.items;
    });
  }
  filterArticlesByTag(articles: Article[], tag: string): any[] {
    return articles.filter((item: any) => item.tags && item.tags.includes(tag));
  }
  onFavouriteClick(article: Article) {
    if (!article.favorited) {
      this.#articleService.favouriteArticle(article.slug).subscribe({
        next: () => {
          article.favorited = true;
          article.favoritesCount++;
        },
        error: () => {
          this.toastr.error('Lỗi');
        },
      });
    } else {
      this.#articleService.unFavouriteArticle(article.slug).subscribe({
        next: () => {
          article.favorited = false;
          article.favoritesCount--;
        },
        error: () => {
          this.toastr.error('Lỗi');
        },
      });
    }
  }
}
