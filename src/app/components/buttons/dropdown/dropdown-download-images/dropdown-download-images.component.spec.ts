import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDownloadImagesComponent } from './dropdown-download-images.component';

describe('DropdownDownloadImagesComponent', () => {
  let component: DropdownDownloadImagesComponent;
  let fixture: ComponentFixture<DropdownDownloadImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownDownloadImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownDownloadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
