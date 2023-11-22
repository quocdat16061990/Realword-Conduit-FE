import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService, UserAndAuthService } from '../shared/services';
import { Observable, Subject, switchMap, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthStore } from '../shared/store/auth';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  Article,
  ArticleAPIResponse,
  CommentAPIResponse,
} from '../shared/models';
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  articleItem: any[] = [];
  slug: string = '';
  comments: any = [];
  currentUser!: string;
  author!: string;
  isFollowed: boolean = false;

  readonly #authStore = inject(AuthStore);
  readonly #articleService = inject(ArticleService);
  readonly #userAndAuthService = inject(UserAndAuthService);
  readonly destroySubject$ = new Subject<void>();
  readonly #router = inject(Router);

  readonly commentForm: any = new FormGroup({
    body: new FormControl('', {
      nonNullable: true,
    }),
  });
  constructor(private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.#authStore.currentUser
      .pipe(
        switchMap((user: any) => {
          this.currentUser = user?.username;
          console.log(this.currentUser);
          return this.#userAndAuthService.getUser();
        }),
        take(1)
      )
      .subscribe({
        next: (res) => {
          this.author = res.username;
          this.isFollowed = res.isFollowed;
        },
        error: (err) => {
          this.toastr.error(err?.message);
        },
      });

    this.route.params.subscribe((params) => {
      this.slug = params['slug'];

      this.getArticleBySlug(this.slug);
      this.getCommentBySlug(this.slug);
    });
  }
  getArticleBySlug(slug: string) {
    this.#articleService.getArticleSlug(slug).subscribe((data: Article) => {
      console.log('data', data);
      this.author = data?.author?.username;
      console.log(this.author);
      this.articleItem = [data];
    });
  }
  getCommentBySlug(slug: string) {
    this.#articleService.getComment(slug).subscribe({
      next: (res: any) => {
        this.comments = res;
      },
      error: (err) => {
        this.toastr.error(err?.message);
      },
    });
  }
  onComment(event: Event, slug: string): void {
    const body = this.commentForm.getRawValue();
    event.preventDefault();
    this.#articleService.postComment(slug, body).subscribe({
      next: (res) => {
        console.log('res', res);
        this.toastr.success('Đăng bài viết thành công');
      },
      error: (err) => {
        console.log('err', err);
        this.toastr.error(err?.message);
      },
    });
  }
  onDeleteComment() {
    const slug = this.slug;
    console.log('slug', slug);
    const { id } = this.comments.map((item: any) => {
      return { id: item.id };
    })[0];
    this.#articleService.deleteComment(slug, id).subscribe({
      next: (res) => {
        this.toastr.success('Xóa bài viết thành công');
      },
      error: (err) => {
        this.toastr.success(err.message);
      },
    });
  }
  onFollowUser() {
    console.log(this.isFollowed);

    const followAction = this.isFollowed ? 'unFollowUser' : 'followUser';

    this.#authStore.currentUser
      .pipe(
        switchMap((user) => {
          const username = user!.username;
          return this.#userAndAuthService[followAction](username);
        }),
        take(1)
      )
      .subscribe({
        next: () => {
          this.toastr.success('Follow thành công');
          this.isFollowed = !this.isFollowed;
        },
        error: () => {
          this.toastr.error('Không thể Follow');
        },
      });
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
  onDeleteArticle(slug: string) {
    console.log(slug);
    this.#articleService.deleteArticle(slug).subscribe({
      next: (res) => {
        this.toastr.success(res.content);
        this.#router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error('Không thể xóa bài');
      },
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
    console.log(this.destroySubject$);
  }
}
