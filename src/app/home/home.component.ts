import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedToogleComponent } from './ui/feed-toogle/feed-toogle.component';
import { TagsComponent } from './ui/tags/tags.component';
import { ArticleListComponent } from './ui/article-list/article-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FeedToogleComponent,
    TagsComponent,
    ArticleListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
