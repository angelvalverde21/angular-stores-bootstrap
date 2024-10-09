import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDniComponent } from './input-dni.component';

describe('InputDniComponent', () => {
  let component: InputDniComponent;
  let fixture: ComponentFixture<InputDniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
