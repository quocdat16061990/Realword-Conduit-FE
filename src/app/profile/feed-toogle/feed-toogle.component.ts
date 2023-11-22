import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
export type TabItem = {
  link?: string;
  title: string;
};
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleListComponent } from 'src/app/shared/ui/article-list/article-list.component';
import { AuthStore } from 'src/app/shared/store/auth';
export const TabTitle = {
  myArticles: 'My Articles',
  favouritesArticles: 'Favourites Articles',
} as const;
@Component({
  selector: 'app-feed-toogle',
  standalone: true,
  imports: [CommonModule, NgbNavModule, ArticleListComponent],
  templateUrl: './feed-toogle.component.html',
  styleUrls: ['./feed-toogle.component.scss'],
})
export class FeedToogleComponent implements OnInit {
  readonly #authStore = inject(AuthStore);
  titleActive: string = '';
  articleTab: TabItem[] = [
    { title: TabTitle.myArticles },
    { title: TabTitle.favouritesArticles },
  ];
  @Output() toggle = new EventEmitter<string>();
  isAuthenticated: boolean = false;
  ngOnInit(): void {
    if (this.#authStore.getIsAuthenticated()) {
      this.isAuthenticated = true;

      const defaultTitle = this.articleTab[0].title;
      this.handleToggle(defaultTitle);
      return;
    }
  }
  handleToggle(title: string) {
    this.toggle.emit(title);
    this.titleActive = title;
  }
}
