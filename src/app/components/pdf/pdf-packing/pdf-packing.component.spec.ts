import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPackingComponent } from './pdf-packing.component';

describe('PdfPackingComponent', () => {
  let component: PdfPackingComponent;
  let fixture: ComponentFixture<PdfPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfPackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
