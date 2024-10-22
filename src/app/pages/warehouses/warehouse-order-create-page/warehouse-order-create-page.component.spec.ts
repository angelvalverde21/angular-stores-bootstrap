import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOrderCreatePageComponent } from './warehouse-order-create-page.component';

describe('WarehouseOrderCreatePageComponent', () => {
  let component: WarehouseOrderCreatePageComponent;
  let fixture: ComponentFixture<WarehouseOrderCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseOrderCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseOrderCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
