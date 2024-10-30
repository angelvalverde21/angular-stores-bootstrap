import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderComponent } from './cart-order.component';

describe('CartOrderComponent', () => {
  let component: CartOrderComponent;
  let fixture: ComponentFixture<CartOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
