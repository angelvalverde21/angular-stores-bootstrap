import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDescriptionComponent } from './color-description.component';

describe('ColorDescriptionComponent', () => {
  let component: ColorDescriptionComponent;
  let fixture: ComponentFixture<ColorDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
