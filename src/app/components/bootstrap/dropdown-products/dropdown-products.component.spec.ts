import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownProductsComponent } from './dropdown-products.component';

describe('DropdownProductsComponent', () => {
  let component: DropdownProductsComponent;
  let fixture: ComponentFixture<DropdownProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
