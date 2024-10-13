import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCourierComponent } from './card-courier.component';

describe('CardCourierComponent', () => {
  let component: CardCourierComponent;
  let fixture: ComponentFixture<CardCourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCourierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
