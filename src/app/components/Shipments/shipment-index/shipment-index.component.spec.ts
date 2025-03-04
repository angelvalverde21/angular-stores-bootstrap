import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentIndexComponent } from './shipment-index.component';

describe('ShipmentIndexComponent', () => {
  let component: ShipmentIndexComponent;
  let fixture: ComponentFixture<ShipmentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
