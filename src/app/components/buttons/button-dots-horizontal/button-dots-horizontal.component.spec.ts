import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDotsHorizontalComponent } from './button-dots-horizontal.component';

describe('ButtonDotsHorizontalComponent', () => {
  let component: ButtonDotsHorizontalComponent;
  let fixture: ComponentFixture<ButtonDotsHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDotsHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDotsHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
