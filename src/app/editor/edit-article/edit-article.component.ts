import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Subject } from 'rxjs';
import { ArticleService } from 'src/app/shared/services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ArticleAPIRequest } from 'src/app/shared/models';
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
  slug: string = '';
  author!: string;
  articleItem: any = {};

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.slug = params['slug'];
      console.log(this.slug);
      this.getArticleBySlug(this.slug);
    });
  }
  getArticleBySlug(slug: string) {
    this.#articleService.getArticleSlug(slug).subscribe((data: any) => {
      this.author = data?.author?.username;

      this.articleItem = data;
    });
  }
  submitForm(formValue: ArticleAPIRequest) {
    const formData = {
      ...formValue,
    };
    console.log('formData: ', formData);
  }
}
