import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDefaultComponent } from './address-default.component';

describe('AddressDefaultComponent', () => {
  let component: AddressDefaultComponent;
  let fixture: ComponentFixture<AddressDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
