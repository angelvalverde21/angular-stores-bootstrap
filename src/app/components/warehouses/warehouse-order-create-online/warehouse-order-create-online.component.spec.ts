import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOrderCreateOnlineComponent } from './warehouse-order-create-online.component';

describe('WarehouseOrderCreateOnlineComponent', () => {
  let component: WarehouseOrderCreateOnlineComponent;
  let fixture: ComponentFixture<WarehouseOrderCreateOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseOrderCreateOnlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseOrderCreateOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
