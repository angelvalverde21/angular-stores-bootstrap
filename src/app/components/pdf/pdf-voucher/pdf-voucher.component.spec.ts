import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfVoucherComponent } from './pdf-voucher.component';

describe('PdfVoucherComponent', () => {
  let component: PdfVoucherComponent;
  let fixture: ComponentFixture<PdfVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
