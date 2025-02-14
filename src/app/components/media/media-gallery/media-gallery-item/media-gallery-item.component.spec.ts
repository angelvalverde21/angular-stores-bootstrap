import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaGalleryItemComponent } from './media-gallery-item.component';

describe('MediaGalleryItemComponent', () => {
  let component: MediaGalleryItemComponent;
  let fixture: ComponentFixture<MediaGalleryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaGalleryItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaGalleryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
