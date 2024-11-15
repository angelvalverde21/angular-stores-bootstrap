import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDotsVerticalComponent } from './button-dots-vertical.component';

describe('ButtonDotsVerticalComponent', () => {
  let component: ButtonDotsVerticalComponent;
  let fixture: ComponentFixture<ButtonDotsVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDotsVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDotsVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
