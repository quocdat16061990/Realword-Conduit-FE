import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Subject } from 'rxjs';
import { ArticleService } from 'src/app/shared/services';
import { ToastrService } from 'ngx-toastr';
import { Article } from 'src/app/shared/models';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  readonly destroySubject$ = new Subject<void>();
  readonly #articleService = inject(ArticleService);
  readonly #toastr = inject(ToastrService);
  @ViewChild(ArticleFormComponent) articleFormComponent!: ArticleFormComponent;
  articleItem: any = {};
  slug: string = '';
  author!: string;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      console.log(this.slug);
      this.getArticleBySlug(this.slug);
    });
  }

  getArticleBySlug(slug: string) {
    this.#articleService.getArticleSlug(slug).subscribe((data: Article) => {
      this.author = data?.author?.username;

      this.articleItem = data;
    });
  }
  submit(event: any) {
    const slug = this.slug;
    const formData = {
      ...this.articleFormComponent.articleForm.getRawValue(),
      title: this.articleItem.title,
      contentArticle: this.articleItem.contentArticle,
      description: this.articleItem.description,
      tags: this.articleItem.tags,
    };
    this.#articleService.updateArticle(formData, slug).subscribe({
      next: (res) => {
        console.log(res);
        this.#toastr.success('Update bài viết thành công');
      },
      error: (err) => {
        console.log(err);
        this.#toastr.error('Không thể update bài viết');
      },
    });
  }
}
