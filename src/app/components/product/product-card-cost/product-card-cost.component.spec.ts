import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardCostComponent } from './product-card-cost.component';

describe('ProductCardCostComponent', () => {
  let component: ProductCardCostComponent;
  let fixture: ComponentFixture<ProductCardCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
