import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzonePaymentComponent } from './dropzone-payment.component';

describe('DropzonePaymentComponent', () => {
  let component: DropzonePaymentComponent;
  let fixture: ComponentFixture<DropzonePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropzonePaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropzonePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
