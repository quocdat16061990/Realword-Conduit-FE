import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from 'src/app/shared/services';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { Article, ArticleAPIRequest } from 'src/app/shared/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  readonly #articleService = inject(ArticleService);
  readonly #toastr = inject(ToastrService);

  articleItem!: Article;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {}

  submitForm(formValue: ArticleAPIRequest) {
    const tags =
      typeof formValue.tags === 'string'
        ? (formValue.tags as string).split(',').map((tag: string) => tag.trim())
        : [];

    const formData = {
      ...formValue,
      tags,
    };
    console.log('formData: ', formData);

    this.#articleService.postArticle(formData).subscribe({
      next: (res) => {
        this.#toastr.success('Đăng bài viết thành công');
      },
      error: (err) => {
        this.#toastr.error('Không đăng bài viết thành công');
      },
    });
  }
}
