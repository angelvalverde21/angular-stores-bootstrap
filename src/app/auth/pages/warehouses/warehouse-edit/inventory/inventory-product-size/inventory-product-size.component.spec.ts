import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryProductSizeComponent } from './inventory-product-size.component';

describe('InventoryProductSizeComponent', () => {
  let component: InventoryProductSizeComponent;
  let fixture: ComponentFixture<InventoryProductSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryProductSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryProductSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
