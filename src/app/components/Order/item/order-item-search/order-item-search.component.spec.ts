import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemSearchComponent } from './order-item-search.component';

describe('OrderItemSearchComponent', () => {
  let component: OrderItemSearchComponent;
  let fixture: ComponentFixture<OrderItemSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
