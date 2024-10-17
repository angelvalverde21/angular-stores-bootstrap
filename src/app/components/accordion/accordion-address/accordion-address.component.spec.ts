import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionAddressComponent } from './accordion-address.component';

describe('AccordionAddressComponent', () => {
  let component: AccordionAddressComponent;
  let fixture: ComponentFixture<AccordionAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
