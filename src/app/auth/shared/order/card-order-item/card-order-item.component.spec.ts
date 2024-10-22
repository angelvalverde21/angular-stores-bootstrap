import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrderItemComponent } from './card-order-item.component';

describe('CardOrderItemComponent', () => {
  let component: CardOrderItemComponent;
  let fixture: ComponentFixture<CardOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOrderItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
