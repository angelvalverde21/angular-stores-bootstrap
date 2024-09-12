import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWarehouseSearchComponent } from './product-warehouse-search.component';

describe('ProductWarehouseSearchComponent', () => {
  let component: ProductWarehouseSearchComponent;
  let fixture: ComponentFixture<ProductWarehouseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductWarehouseSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductWarehouseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
