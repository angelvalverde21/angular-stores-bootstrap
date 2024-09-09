import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductColorSizeComponent } from './product-color-size.component';

describe('ProductColorSizeComponent', () => {
  let component: ProductColorSizeComponent;
  let fixture: ComponentFixture<ProductColorSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductColorSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductColorSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
