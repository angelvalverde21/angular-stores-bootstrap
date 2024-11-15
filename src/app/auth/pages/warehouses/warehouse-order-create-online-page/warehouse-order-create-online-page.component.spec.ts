import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOrderCreateOnlinePageComponent } from './warehouse-order-create-online-page.component';

describe('WarehouseOrderCreateOnlinePageComponent', () => {
  let component: WarehouseOrderCreateOnlinePageComponent;
  let fixture: ComponentFixture<WarehouseOrderCreateOnlinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseOrderCreateOnlinePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseOrderCreateOnlinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
