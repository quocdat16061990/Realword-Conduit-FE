import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagService } from 'src/app/shared/services/tag.service';
@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags: any;
  constructor(private tagsService: TagService) {}
  @Output() selectTag = new EventEmitter<string>();
  ngOnInit(): void {
    this.tagsService.getTags().subscribe((data) => {
      this.tags = data;
    });
  }
}
