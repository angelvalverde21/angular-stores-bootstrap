import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSummaryComponent } from './card-summary.component';

describe('CardSummaryComponent', () => {
  let component: CardSummaryComponent;
  let fixture: ComponentFixture<CardSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
