import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressShowPageComponent } from './address-show-page.component';

describe('AddressShowPageComponent', () => {
  let component: AddressShowPageComponent;
  let fixture: ComponentFixture<AddressShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressShowPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
