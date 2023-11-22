import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { DatePipe, NgClass, NgFor, NgIf, CommonModule } from '@angular/common';
import { Article, ArticleFavouriteAPIRequest } from '../../models';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../services';
@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DatePipe, RouterLink, NgClass],
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
})
export class ArticleItemComponent {
  @Input({ required: true }) article!: Article;
  @Output() favouriteClick = new EventEmitter<Article>();

  onFavouriteClick() {
    this.favouriteClick.emit(this.article);
  }
}
