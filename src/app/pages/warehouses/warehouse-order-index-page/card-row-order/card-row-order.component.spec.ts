import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRowOrderComponent } from './card-row-order.component';

describe('CardRowOrderComponent', () => {
  let component: CardRowOrderComponent;
  let fixture: ComponentFixture<CardRowOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRowOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRowOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
