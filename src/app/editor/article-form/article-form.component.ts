import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Article, ArticleAPIRequest } from 'src/app/shared/models';
import { TypedFormGroup } from 'src/app/shared/utils/typed-form-group';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./article-form.component.scss'],
  standalone: true,
})
export class ArticleFormComponent {
  readonly articleForm: FormGroup = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
    }),
    contentArticle: new FormControl('', {
      nonNullable: true,
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    tags: new FormControl<string[]>([], {
      nonNullable: true,
    }),
  });
  @Input({ required: true }) text!: string;
  @Input() set article(value: Article) {
    if (value?.title) {
      this.articleForm.setValue({
        tags: value.tags,
        contentArticle: value.contentArticle,
        description: value.description,
        title: value.title,
      });
    }
  }
  @Output() submitForm = new EventEmitter<ArticleAPIRequest>();
}
