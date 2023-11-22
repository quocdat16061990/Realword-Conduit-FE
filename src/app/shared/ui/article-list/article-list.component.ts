import {
  Component,
  OnInit,
  inject,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ArticleService,
  ArticleGlobalQueryParams,
} from 'src/app/shared/services/article.service';
import { Subscription } from 'rxjs';
import { AuthStore } from 'src/app/shared/store/auth';
import { Article } from 'src/app/shared/models';
import { ArticleItemComponent } from '../article-item/article-item.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleItemComponent],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  @Input() articles: Article[] = [];
  @Output() favouriteClick = new EventEmitter<Article>();

  onFavouriteClick(article: Article) {
    this.favouriteClick.emit(article);
  }
}
