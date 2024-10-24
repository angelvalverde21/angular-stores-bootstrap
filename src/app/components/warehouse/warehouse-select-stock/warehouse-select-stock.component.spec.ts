import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSelectStockComponent } from './warehouse-select-stock.component';

describe('WarehouseSelectStockComponent', () => {
  let component: WarehouseSelectStockComponent;
  let fixture: ComponentFixture<WarehouseSelectStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseSelectStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseSelectStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
