import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedToogleComponent } from './feed-toogle.component';

describe('FeedToogleComponent', () => {
  let component: FeedToogleComponent;
  let fixture: ComponentFixture<FeedToogleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedToogleComponent]
    });
    fixture = TestBed.createComponent(FeedToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
