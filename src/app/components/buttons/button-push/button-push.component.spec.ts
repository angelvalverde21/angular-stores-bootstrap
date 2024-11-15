import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPushComponent } from './button-push.component';

describe('ButtonPushComponent', () => {
  let component: ButtonPushComponent;
  let fixture: ComponentFixture<ButtonPushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPushComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
