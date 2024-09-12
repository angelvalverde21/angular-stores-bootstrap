import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsWarehousePageComponent } from './products-warehouse-page.component';

describe('ProductsWarehousePageComponent', () => {
  let component: ProductsWarehousePageComponent;
  let fixture: ComponentFixture<ProductsWarehousePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsWarehousePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsWarehousePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
