import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryColorComponent } from './inventory-color.component';

describe('InventoryColorComponent', () => {
  let component: InventoryColorComponent;
  let fixture: ComponentFixture<InventoryColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
