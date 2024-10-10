import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCartComponent } from './button-cart.component';

describe('ButtonCartComponent', () => {
  let component: ButtonCartComponent;
  let fixture: ComponentFixture<ButtonCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
