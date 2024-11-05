import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDefaultComponent } from './courier-default.component';

describe('CourierDefaultComponent', () => {
  let component: CourierDefaultComponent;
  let fixture: ComponentFixture<CourierDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourierDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
