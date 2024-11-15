import { TestBed } from '@angular/core/testing';

import { WarehouseOrderService } from './warehouse-order.service';

describe('WarehouseOrderService', () => {
  let service: WarehouseOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
