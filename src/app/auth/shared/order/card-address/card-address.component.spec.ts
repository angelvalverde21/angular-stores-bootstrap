import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAddressComponent } from './card-address.component';

describe('CardAddressComponent', () => {
  let component: CardAddressComponent;
  let fixture: ComponentFixture<CardAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
