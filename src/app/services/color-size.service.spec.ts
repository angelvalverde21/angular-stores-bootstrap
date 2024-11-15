import { TestBed } from '@angular/core/testing';

import { ColorSizeService } from './color-size.service';

describe('ColorSizeService', () => {
  let service: ColorSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
