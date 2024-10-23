import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchColorComponent } from './input-search-color.component';

describe('InputSearchColorComponent', () => {
  let component: InputSearchColorComponent;
  let fixture: ComponentFixture<InputSearchColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSearchColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
