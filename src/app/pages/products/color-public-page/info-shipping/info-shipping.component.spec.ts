import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoShippingComponent } from './info-shipping.component';

describe('InfoShippingComponent', () => {
  let component: InfoShippingComponent;
  let fixture: ComponentFixture<InfoShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoShippingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
