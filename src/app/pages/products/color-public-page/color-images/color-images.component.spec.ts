import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorImagesComponent } from './color-images.component';

describe('ColorImagesComponent', () => {
  let component: ColorImagesComponent;
  let fixture: ComponentFixture<ColorImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
