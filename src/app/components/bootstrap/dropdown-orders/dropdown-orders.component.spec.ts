import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownOrdersComponent } from './dropdown-orders.component';

describe('DropdownOrdersComponent', () => {
  let component: DropdownOrdersComponent;
  let fixture: ComponentFixture<DropdownOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
