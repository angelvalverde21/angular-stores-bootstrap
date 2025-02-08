import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownViewGalleryComponent } from './dropdown-view-gallery.component';

describe('DropdownViewGalleryComponent', () => {
  let component: DropdownViewGalleryComponent;
  let fixture: ComponentFixture<DropdownViewGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownViewGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownViewGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
