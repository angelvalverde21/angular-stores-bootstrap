import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuantityComponent } from './select-quantity.component';

describe('SelectQuantityComponent', () => {
  let component: SelectQuantityComponent;
  let fixture: ComponentFixture<SelectQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectQuantityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
