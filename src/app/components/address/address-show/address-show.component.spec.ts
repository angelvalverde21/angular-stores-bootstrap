import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressShowComponent } from './address-show.component';

describe('AddressShowComponent', () => {
  let component: AddressShowComponent;
  let fixture: ComponentFixture<AddressShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
