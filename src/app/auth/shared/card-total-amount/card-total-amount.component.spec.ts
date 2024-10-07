import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTotalAmountComponent } from './card-total-amount.component';

describe('CardTotalAmountComponent', () => {
  let component: CardTotalAmountComponent;
  let fixture: ComponentFixture<CardTotalAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTotalAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTotalAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
