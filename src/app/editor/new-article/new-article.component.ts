import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from 'src/app/shared/services';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  readonly destroySubject$ = new Subject<void>();
  readonly #articleService = inject(ArticleService);
  readonly #toastr = inject(ToastrService);
  @ViewChild(ArticleFormComponent) articleFormComponent!: ArticleFormComponent;
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  submit(event: any) {
    const tags =
      this.articleFormComponent.articleForm
        .get('tags')
        ?.value.split(',')
        .map((tag: any) => tag.trim()) || [];
    const formData = {
      ...this.articleFormComponent.articleForm.getRawValue(),
      tags: tags,
    };
    this.#articleService.postArticle(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.#toastr.success('Đăng bài viết thành công');
      },
      error: (err) => {
        console.log(err)
        this.#toastr.error('Không thể đăng bài viết');
      },
    });
  }
}
