import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonIconDeleteComponent } from './button-icon-delete.component';

describe('ButtonIconDeleteComponent', () => {
  let component: ButtonIconDeleteComponent;
  let fixture: ComponentFixture<ButtonIconDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonIconDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonIconDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
