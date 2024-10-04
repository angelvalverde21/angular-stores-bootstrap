import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddCartComponent } from './button-add-cart.component';

describe('ButtonAddCartComponent', () => {
  let component: ButtonAddCartComponent;
  let fixture: ComponentFixture<ButtonAddCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAddCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAddCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
