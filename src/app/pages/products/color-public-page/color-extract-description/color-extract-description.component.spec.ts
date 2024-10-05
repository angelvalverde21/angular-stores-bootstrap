import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorExtractDescriptionComponent } from './color-extract-description.component';

describe('ColorExtractDescriptionComponent', () => {
  let component: ColorExtractDescriptionComponent;
  let fixture: ComponentFixture<ColorExtractDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorExtractDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorExtractDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
