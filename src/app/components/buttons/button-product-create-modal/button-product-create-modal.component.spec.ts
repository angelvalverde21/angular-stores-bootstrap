import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonProductCreateModalComponent } from './button-product-create-modal.component';

describe('ButtonProductCreateModalComponent', () => {
  let component: ButtonProductCreateModalComponent;
  let fixture: ComponentFixture<ButtonProductCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonProductCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonProductCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
