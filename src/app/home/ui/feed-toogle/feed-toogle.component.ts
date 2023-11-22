import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleListComponent } from '../../../shared/ui/article-list/article-list.component';
export type TabItem = {
  link?: string;
  title: string;
};

import { AuthStore } from 'src/app/shared/store/auth';
export enum TabType {
  Link,
  NoneLink,
}
@Component({
  selector: 'app-feed-toogle',
  standalone: true,
  imports: [CommonModule, NgbNavModule, ArticleListComponent],
  templateUrl: './feed-toogle.component.html',
  styleUrls: ['./feed-toogle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedToogleComponent implements OnInit {
  readonly #authStore = inject(AuthStore);
  titleActive: string = '';
  private _tabItems!: TabItem[];
  @Input({ required: true })
  set tabItems(v: TabItem[]) {
    this._tabItems = v;
    let tabItem = v.find((item) => item.title.startsWith('#'));
    if (tabItem) {
      this.handleToggle(tabItem.title);
    }
  }

  get tabItems() {
    return this._tabItems;
  }

  @Output() toggle = new EventEmitter<string>();
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    if (this.#authStore.getIsAuthenticated()) {
      this.isAuthenticated = true;

      this.handleToggle('Your Feed');
      return;
    }

    this.handleToggle('Global Feed');
  }

  handleToggle(title: string) {
    if (!title.startsWith('#')) {

        this.tabItems = this.tabItems.filter(x=> !x.title.startsWith('#'))
      }

    this.toggle.emit(title);
    this.titleActive = title;
  }
}
//  global feed 
