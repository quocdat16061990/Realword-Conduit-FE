import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ArticleService,
  ArticleGlobalQueryParams,
} from 'src/app/shared/article.service';
@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articleData: any;
  tags:any;
  constructor(private articleService: ArticleService) {}
  ngOnInit(): void {
    const queryParams: ArticleGlobalQueryParams = {
      limit: 10,
      offset: 0,
    };
    this.articleService.getArticleGlobal(queryParams).subscribe((data) => {
      const {totalCount,items} = data;
      this.articleData = items
    });
  }
}
