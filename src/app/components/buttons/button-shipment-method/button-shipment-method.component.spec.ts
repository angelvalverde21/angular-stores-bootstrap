import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonShipmentMethodComponent } from './button-shipment-method.component';

describe('ButtonShipmentMethodComponent', () => {
  let component: ButtonShipmentMethodComponent;
  let fixture: ComponentFixture<ButtonShipmentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonShipmentMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonShipmentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
