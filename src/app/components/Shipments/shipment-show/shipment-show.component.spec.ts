import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentShowComponent } from './shipment-show.component';

describe('ShipmentShowComponent', () => {
  let component: ShipmentShowComponent;
  let fixture: ComponentFixture<ShipmentShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
