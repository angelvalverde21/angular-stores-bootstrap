import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsWarehouseComponent } from './products-warehouse.component';

describe('ProductsWarehouseComponent', () => {
  let component: ProductsWarehouseComponent;
  let fixture: ComponentFixture<ProductsWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
