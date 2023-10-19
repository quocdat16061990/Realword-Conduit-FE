import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleListComponent } from '../article-list/article-list.component';
export type TabItem = {
  link?: string;
  title: string;
};

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
export class FeedToogleComponent {
  active = 1;
}
