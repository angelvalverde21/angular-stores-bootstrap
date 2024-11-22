import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonProductReportComponent } from './button-product-report.component';

describe('ButtonProductReportComponent', () => {
  let component: ButtonProductReportComponent;
  let fixture: ComponentFixture<ButtonProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonProductReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
