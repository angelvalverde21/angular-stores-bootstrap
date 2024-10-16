import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAuthComponent } from './checkout-auth.component';

describe('CheckoutAuthComponent', () => {
  let component: CheckoutAuthComponent;
  let fixture: ComponentFixture<CheckoutAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
